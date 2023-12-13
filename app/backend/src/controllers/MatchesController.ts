import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) { }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query as { inProgress: string | undefined };
    const { status, data } = await this.matchesService.getAll(inProgress);
    return res.status(status).json(data);
  }
}
