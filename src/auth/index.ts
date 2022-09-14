import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/user.interface';

const secret = 'OvoCozido';

interface Token {
  data: TokenData,
  iat: number,
  exp: number
}

export interface TokenData {
  id?: number,
  username: string,
  classe?: string,
  level?: number,
  password: string
}

export interface ReqData extends Request {
  data?: TokenData,
}

export const createJWT = (user: User): string => {
  const token = jwt.sign({ data: user }, secret, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

export const validateJWT = (req: ReqData, res: Response, next: NextFunction): TokenData | void => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) res.status(401).json({ message: 'Token not found' });

    const decoded = jwt.verify(token as string, secret) as Token;

    req.data = decoded.data;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};