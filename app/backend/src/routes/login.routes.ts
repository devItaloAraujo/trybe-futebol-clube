import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import validateToken from '../middlewares/validateToken';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post('/', (req: Request, res: Response) => loginController.logIn(req, res));
loginRouter.get('/role', validateToken);
export default loginRouter;
