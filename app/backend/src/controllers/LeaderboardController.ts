import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService = new LeaderboardService()) { }

  public async getAll(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAll();
    return res.status(status).json(data);
  }

  public async getHome(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getHome();
    return res.status(status).json(data);
  }

  public async getAway(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getAway();
    return res.status(status).json(data);
  }
}
