import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../Interfaces/users/IUser';

const SECRET_KEY = process.env.JWT_SECRET || 'suaSenhaSecreta';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (!token[1] || token[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  jwt.verify(token[1], SECRET_KEY, (err: jwt.VerifyErrors | null, decoded: object | undefined) => {
    if (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    if (decoded) {
      const user = decoded as IUser;
      return res.status(200).json({ role: user.role });
    }
    next();
  });
}

export default validateToken;
