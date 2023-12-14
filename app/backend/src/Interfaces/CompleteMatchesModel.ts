import MatchesModel from '../database/models/MatchesModel';

type TeamOfMatch = { teamName: string };

export default class CompleteMatchesModel extends MatchesModel {
  public homeTeam: TeamOfMatch;
  public awayTeam: TeamOfMatch;
  constructor() {
    super();
    this.homeTeam = { teamName: '' };
    this.awayTeam = { teamName: '' };
  }
}
