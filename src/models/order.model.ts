import { Pool } from 'mysql2/promise';
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
}

export default OrderModel;