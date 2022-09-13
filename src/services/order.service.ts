import OrderModel from '../models/order.model';
import connection from '../models/connection';
import Order from '../interfaces/order.interface';
import ProductModel from '../models/product.model';

class OrderService {
  private orderModel: OrderModel;

  private productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.orderModel.getAll();

    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
    // Ajuda com o Promise.all;
    const orders = await Promise.all(
      result.map(async ({ id, userId }) => {
        const products = await this.productModel.getByOrderId(id);
  
        const productsIds: number[] = [];
        for (let i = 0; i < products.length; i += 1) {
          const productId = products[i].id;
          productsIds.push(productId as number);
        }
  
        const order = { id, userId, productsIds };
        return order;
      }),
    );

    return orders;
  }
}

export default OrderService;