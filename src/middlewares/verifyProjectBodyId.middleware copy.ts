import { NextFunction, Request, Response } from 'express';
import { client } from '../database';
import AppError from '../errors/App.error';
import {
  TDeveloper,
  TDeveloperResult,
} from '../interfaces/developers.interface';

export const verifyProjectBodyId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.body;

  const queryResult: TDeveloperResult = await client.query(
    `SELECT id FROM "developers" WHERE "id" = $1`,
    [developerId]
  );

  if (!queryResult.rowCount) {
    throw new AppError('Developer not found', 404);
  }

  const foundDeveloper: TDeveloper = queryResult.rows[0];

  res.locals = { ...res.locals, foundDeveloper };

  return next();
};
