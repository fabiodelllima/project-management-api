import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/App.error';
import { client } from '../database';
import { TDeveloperInfosResult } from '../interfaces/developerInfos.interface';

export const verifyDeveloperInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: TDeveloperInfosResult = await client.query(
    `SELECT id FROM "developerInfos" WHERE "developerId" = $1`,
    [id]
  );

  if (queryResult.rowCount) {
    throw new AppError('Developer infos already exists.', 409);
  }

  return next();
};
