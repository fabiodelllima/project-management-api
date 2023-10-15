import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/App.error';
import { client } from '../database';
import {
  TDeveloperInfos,
  TDeveloperInfosResult,
} from '../interfaces/developerInfos.interface';

export const verifyDeveloperInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: TDeveloperInfosResult = await client.query(
    `SELECT id FROM "developerInfos" WHERE "id" = $1`,
    [id]
  );

  if (queryResult.rowCount) {
    throw new AppError('Developer infos already exists.', 409);
  }

  // const foundDeveloperInfos: TDeveloperInfos =
  //   queryResult.rows[0];

  // res.locals = { ...res.locals, foundDeveloperInfos };

  return next();
};
