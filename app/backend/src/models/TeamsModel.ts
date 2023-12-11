import SequelizeTeams from '../database/models/TeamsModel';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map((item) => (
      { id: item.id, teamName: item.teamName }
    ));
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (!dbData) return null;
    return { id: dbData.id, teamName: dbData.teamName };
  }
}
