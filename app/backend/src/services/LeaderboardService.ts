import CompleteMatchesModel from '../Interfaces/CompleteMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

type Leaderboard = { name: string, totalPoints: number,
  totalGames: number, totalVictories: number, totalDraws: number, totalLosses: number,
  goalsFavor: number, goalsOwn: number, goalsBalance:number, efficiency: number };

function points(GoalsA: number, GoalsB: number) {
  if (GoalsA > GoalsB) return 3;
  if (GoalsA === GoalsB) return 1;
  return 0;
}

function NewItem(GoalsA: number, GoalsB: number, teamName: string) {
  return {
    name: teamName,
    totalPoints: points(GoalsA, GoalsB),
    totalGames: 1,
    totalVictories: GoalsA > GoalsB ? 1 : 0,
    totalDraws: GoalsA === GoalsB ? 1 : 0,
    totalLosses: GoalsA < GoalsB ? 1 : 0,
    goalsFavor: GoalsA,
    goalsOwn: GoalsB,
    goalsBalance: GoalsA - GoalsB,
    efficiency: Number(((points(GoalsA, GoalsB) / 3) * 100).toFixed(2)),
  };
}

function UpdateItem(team: Leaderboard, GoalsA: number, GoalsB: number) {
  return {
    name: team.name,
    totalPoints: team.totalPoints + points(GoalsA, GoalsB),
    totalGames: team.totalGames + 1,
    totalVictories: team.totalVictories + (GoalsA > GoalsB ? 1 : 0),
    totalDraws: team.totalDraws + (GoalsA === GoalsB ? 1 : 0),
    totalLosses: team.totalLosses + (GoalsA < GoalsB ? 1 : 0),
    goalsFavor: team.goalsFavor + GoalsA,
    goalsOwn: team.goalsOwn + GoalsB,
    goalsBalance: team.goalsBalance + (GoalsA - GoalsB),
    efficiency: Number((((
      team.totalPoints
         + points(GoalsA, GoalsB)) / ((team.totalGames + 1) * 3)) * 100).toFixed(2)),
  };
}

function sort(array: Leaderboard[]) {
  array.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
}

export default class LeaderboardService {
  constructor(private matchesModel = MatchesModel) { }

  private async getMatches() {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    }) as CompleteMatchesModel[];
    return matches;
  }

  public async getAll(): Promise<ServiceResponse<unknown>> {
    const matches = await this.getMatches();
    const data = matches.reduce((acc, match) => {
      const homeTeam = match.homeTeam.teamName;
      const awayTeam = match.awayTeam.teamName;
      const { homeTeamGoals, awayTeamGoals } = match;
      const homeAcc = acc.find((team) => team.name === homeTeam);
      if (!homeAcc) {
        acc.push(NewItem(homeTeamGoals, awayTeamGoals, homeTeam));
      } else {
        acc[acc.indexOf(homeAcc)] = UpdateItem(homeAcc, homeTeamGoals, awayTeamGoals);
      }
      const awayAcc = acc.find((team) => team.name === awayTeam);
      if (!awayAcc) {
        acc.push(NewItem(awayTeamGoals, homeTeamGoals, awayTeam));
      } else { acc[acc.indexOf(awayAcc)] = UpdateItem(awayAcc, awayTeamGoals, homeTeamGoals); }
      return acc;
    }, [] as Leaderboard[]);
    sort(data); return ({ status: 200, data });
  }

  public async getHome(): Promise<ServiceResponse<unknown>> {
    const matches = await this.getMatches();
    const data = matches.reduce((acc, match) => {
      const homeTeam = match.homeTeam.teamName;

      const { homeTeamGoals, awayTeamGoals } = match;
      const homeAcc = acc.find((team) => team.name === homeTeam);
      if (!homeAcc) {
        acc.push(NewItem(homeTeamGoals, awayTeamGoals, homeTeam));
      } else {
        acc[acc.indexOf(homeAcc)] = UpdateItem(homeAcc, homeTeamGoals, awayTeamGoals);
      }
      return acc;
    }, [] as Leaderboard[]);
    sort(data); return ({ status: 200, data });
  }

  public async getAway(): Promise<ServiceResponse<unknown>> {
    const matches = await this.getMatches();
    const data = matches.reduce((acc, match) => {
      const awayTeam = match.awayTeam.teamName;
      const { homeTeamGoals, awayTeamGoals } = match;
      const awayAcc = acc.find((team) => team.name === awayTeam);
      if (!awayAcc) {
        acc.push(NewItem(awayTeamGoals, homeTeamGoals, awayTeam));
      } else { acc[acc.indexOf(awayAcc)] = UpdateItem(awayAcc, awayTeamGoals, homeTeamGoals); }
      return acc;
    }, [] as Leaderboard[]);
    sort(data); return ({ status: 200, data });
  }
}
