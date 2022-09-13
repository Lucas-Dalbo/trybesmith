import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<Product> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUE (?,?);',
      [product.name, product.amount],
    );
    const { insertId } = result;
    return { id: insertId, ...product } as Product;
  }

  public async getAll(): Promise<Product[]> {
    const [result] = await this.connection
      .execute('SELECT * FROM Trybesmith.Products;');
      
    return result as Product[];
  }

  public async getByOrderId(id: number): Promise<Product[]> {
    const [result] = await this.connection
      .execute('SELECT * FROM Trybesmith.Products WHERE orderId=?;', [id]);
      
    return result as Product[];
  }
}

export default ProductModel;