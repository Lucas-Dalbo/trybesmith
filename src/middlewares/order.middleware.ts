import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { MyError } from './error.middleware';

class OrderMiddleware {
  public validateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { productsIds } = req.body;

    const { error: required } = Joi.object({
      productsIds: Joi.required(),
    }).validate({ productsIds });

    if (required) throw new MyError(required.details[0].message, 400);

    const { error: type } = Joi.object({
      productsIds: Joi.array(),
    }).validate({ productsIds });

    if (type) throw new MyError(type.details[0].message, 422);

    if (!productsIds.length) throw new MyError('"productsIds" must include only numbers', 422);

    const { error: style } = Joi.object({
      productsIds: Joi.array().items(Joi.number().integer()),
    }).validate({ productsIds });

    if (style) throw new MyError('"productsIds" must include only numbers', 422);

    next();
  };
}

export default OrderMiddleware;