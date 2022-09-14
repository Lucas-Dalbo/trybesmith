import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../interfaces/user.interface';

const secret = 'OvoCozido';

interface Token {
  data: {
    id?: number,
    username: string,
    classe?: string,
    level?: number,
    password: string
  },
  iat: number,
  exp: number
}

export const createJWT = (user: User) => {
  const token = jwt.sign({ data: user }, secret, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

export const validateJWT = (req: Request, res: Response) => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) res.status(401).json({ message: 'Token não encontrado' });

    const decoded = jwt.verify(token as string, secret) as Token;

    return decoded.data;
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};