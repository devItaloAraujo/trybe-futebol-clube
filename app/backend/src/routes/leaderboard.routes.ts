import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.getHome(req, res));
leaderboardRouter.get('/', (req, res) => leaderboardController.getAll(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.getAway(req, res));

export default leaderboardRouter;
