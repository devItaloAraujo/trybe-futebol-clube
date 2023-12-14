import { Request } from 'express';

export interface roleRequest extends Request {
  role?: string;
}
