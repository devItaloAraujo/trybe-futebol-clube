import TeamsModel from '../database/models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  constructor(private matchesModel = MatchesModel) { }

  public async getAll(inProgress: string | undefined): Promise<ServiceResponse<MatchesModel[]>> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    if (inProgress) {
      const filteredMatches = matches.filter((match) => String(match.inProgress) === inProgress);
      return { status: 200, data: filteredMatches };
    }
    return { status: 200, data: matches };
  }
}
