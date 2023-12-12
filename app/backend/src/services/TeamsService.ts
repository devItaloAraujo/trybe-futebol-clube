import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) { }

  public async getAll(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 200, data: teams };
  }

  public async getById(id: number): Promise<ServiceResponse<ITeams | { message: string }>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 404, data: { message: `Team ${id} not found` } };
    return { status: 200, data: team };
  }
}
