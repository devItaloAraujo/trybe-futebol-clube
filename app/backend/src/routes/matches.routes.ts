import { Router, Request, Response, NextFunction } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';
import validateMatch from '../middlewares/validateMatch';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));
matchesRouter.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchesController.finish(req, res),
);
matchesRouter.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matchesController.update(req, res),
);
matchesRouter.post(
  '/',
  validateToken,
  (req: Request, res: Response, next: NextFunction) => validateMatch(req, res, next),
  (req: Request, res: Response) => matchesController.create(req, res),
);

export default matchesRouter;
