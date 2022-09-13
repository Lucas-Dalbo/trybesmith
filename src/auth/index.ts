import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/user.interface';

const secret = 'OvoCozido';

export const createJWT = (user: User) => {
  const token = jwt.sign({ data: user }, secret, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) res.status(401).json({ message: 'Token não encontrado' });

    jwt.verify(token as string, secret);

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};