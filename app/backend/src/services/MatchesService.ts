import { IMatches } from '../Interfaces/matches/IMatches';
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

  public async finish(id: string): Promise<ServiceResponse<{ message: string } | unknown>> {
    try {
      await this.matchesModel.update({ inProgress: false }, { where: { id } });
      return ({ status: 200, data: { message: 'Match Finished' } });
    } catch (error) {
      return ({ status: 500, data: error });
    }
  }

  public async update(
    id: string,
    body: { homeTeamGoals: number, awayTeamGoals: number },
  ): Promise<ServiceResponse<unknown>> {
    try {
      const { homeTeamGoals, awayTeamGoals } = body;
      const match = await this.matchesModel.findOne({ where: { id } });

      if (!match) return ({ status: 404, data: { message: 'Match not found' } });

      await this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
      return ({ status: 200, data: { message: 'Match updated' } });
    } catch (error) {
      return ({ status: 500, data: error });
    }
  }

  public async create(
    body: IMatches,
  ): Promise<ServiceResponse<MatchesModel | unknown>> {
    try {
      const match = await this.matchesModel.create({
        ...body, inProgress: true,
      });
      return ({ status: 201, data: match });
    } catch (error) {
      return ({ status: 500, data: error });
    }
  }
}
