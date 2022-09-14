import { Request, Response, NextFunction } from 'express';
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
}

export default UserMiddleware;