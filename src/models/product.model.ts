// import Product from '../interfaces/product.interface';
import { Pool } from 'mysql2/promise';

class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }
}

export default ProductModel;