import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { MyError } from './error.middleware';

class ProductMiddleware {
  public productValidation = (req: Request, res: Response, next: NextFunction) => {
    const { name, amount } = req.body;

    const { error: required } = Joi.object({
      name: Joi.required(),
      amount: Joi.required(),
    }).validate({ name, amount });

    if (required) throw new MyError(required.details[0].message, 400);

    const { error: style } = Joi.object({
      name: Joi.string().min(3),
      amount: Joi.string().min(3),
    }).validate({ name, amount });

    if (style) throw new MyError(style.details[0].message, 422);

    next();
  };
}

export default ProductMiddleware;