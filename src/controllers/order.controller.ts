import { Request, Response } from 'express';
import { ReqData, TokenData } from '../auth';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: ReqData, res: Response) => {
    const { productsIds } = req.body;
    const { data } = req;
    const { id } = data as TokenData;

    const newOrder = await this.orderService.create(id as number, productsIds);

    res.status(201).json(newOrder);
  };
}

export default OrderController;