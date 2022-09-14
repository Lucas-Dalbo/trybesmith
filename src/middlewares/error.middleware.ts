import { Request, Response, NextFunction } from 'express';

export class MyError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

const errorMiddleware = (err: MyError, _req: Request, res: Response, _next: NextFunction) => {
  if (!err.status) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }

  const { message, status } = err;
  res.status(status).json({ message });
};

export default errorMiddleware;