import ProductModel from '../models/product.model';
import connection from '../models/connection';

class ProductService {
  public productModel = new ProductModel(connection);
}

export default ProductService;