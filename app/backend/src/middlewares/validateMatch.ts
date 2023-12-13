import { Request, Response, NextFunction } from 'express';
import TeamsModel from '../database/models/TeamsModel';

async function validateMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res
      .status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const team1 = await TeamsModel.findOne({ where: { id: homeTeamId } });
  const team2 = await TeamsModel.findOne({ where: { id: awayTeamId } });

  if (!team1 || !team2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}

export default validateMatch;
