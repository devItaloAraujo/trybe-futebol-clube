import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default teamsRouter;
