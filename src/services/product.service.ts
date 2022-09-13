import ProductModel from '../models/product.model';
import connection from '../models/connection';
import Product from '../interfaces/product.interface';

class ProductService {
  public productModel = new ProductModel(connection);

  public async create(product: Product): Promise<Product> {
    const newProduct = await this.productModel.create(product);

    return newProduct;
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.productModel.getAll();

    return products;
  }
}

export default ProductService;