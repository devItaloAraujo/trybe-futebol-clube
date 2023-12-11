import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) { }

  public async getAll(req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAll();
    return res.status(status).json(data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getById(Number(id));
    return res.status(status).json(data);
  }
}
