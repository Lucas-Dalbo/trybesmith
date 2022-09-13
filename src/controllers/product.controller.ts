import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  private productService = new ProductService();

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const newProduct = await this.productService.create({ name, amount });

    res.status(201).json(newProduct);
  };
}

export default ProductController;