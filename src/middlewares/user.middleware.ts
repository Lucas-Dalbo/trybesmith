import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import User from '../interfaces/user.interface';
import { MyError } from './error.middleware';

class UserMiddleware {
  private loginProps = ['username', 'password'];

  private validateProps = (user: User): [boolean, string | null] => {
    for (let i = 0; i < this.loginProps.length; i += 1) {
      const prop = this.loginProps[i];
      if (!Object.prototype.hasOwnProperty.call(user, prop)) return [false, prop];
    }

    return [true, null];
  };

  public validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const [valid, prop] = this.validateProps(user);

    if (!valid) throw new MyError(`"${prop}" is required`, 400);

    next();
  };

  public validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, classe, level, password } = req.body;

    const { error: required } = Joi.object({
      username: Joi.required(),
      classe: Joi.required(),
      level: Joi.required(),
      password: Joi.required(),
    }).validate({ username, classe, level, password });

    if (required) throw new MyError(required.details[0].message, 400);

    const { error: style } = Joi.object({
      username: Joi.string().min(3),
      classe: Joi.string().min(3),
      level: Joi.number().min(1),
      password: Joi.string().min(8),
    }).validate({ username, classe, level, password });

    if (style) throw new MyError(style.details[0].message, 422);

    next();
  };
}

export default UserMiddleware;