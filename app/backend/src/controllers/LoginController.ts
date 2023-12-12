import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class LoginController {
  constructor(private loginService: UserService = new UserService()) { }

  public async logIn(req: Request, res: Response) {
    const { status, data } = await this.loginService.logIn(req.body);
    return res.status(status).json(data);
  }
}
