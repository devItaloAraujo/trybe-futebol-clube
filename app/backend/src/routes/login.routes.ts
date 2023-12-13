import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import validateToken, { roleRequest } from '../middlewares/validateToken';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post('/', (req: Request, res: Response) => loginController.logIn(req, res));
loginRouter.get(
  '/role',
  validateToken,
  (req: roleRequest, res: Response) => res.status(200).json({ role: req.role }),
);
export default loginRouter;
