import { ITeams } from './ITeams';

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>,
  findById(id: number): Promise<ITeams | null>
}
