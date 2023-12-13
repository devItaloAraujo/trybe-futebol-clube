import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));

export default matchesRouter;
