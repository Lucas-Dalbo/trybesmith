import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

class OrderModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [result] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Orders',
    );

    return result as Order[];
  }

  public async create(userId: number): Promise<number> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUE (?);',
      [userId],
    );

    const { insertId } = result;
    return insertId;
  }
}

export default OrderModel;