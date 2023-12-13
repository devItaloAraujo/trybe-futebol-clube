import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) { }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query as { inProgress: string | undefined };
    const { status, data } = await this.matchesService.getAll(inProgress);
    return res.status(status).json(data);
  }

  public async finish(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.finish(id);
    return res.status(status).json(data);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.update(id, req.body);
    return res.status(status).json(data);
  }

  public async create(req: Request, res: Response) {
    const { status, data } = await this.matchesService.create(req.body);
    return res.status(status).json(data);
  }
}
