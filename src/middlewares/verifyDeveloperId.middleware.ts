import { NextFunction, Request, Response } from 'express';
import { client } from '../database';
import {
  TDeveloper,
  TDeveloperResult,
} from '../interfaces/developers.interface';
import AppError from '../errors/App.error';

export const verifyDeveloperId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: TDeveloperResult = await client.query(
    `SELECT id FROM "developers" WHERE "id" = $1`,
    [id]
  );

  if (!queryResult.rowCount) {
    throw new AppError('Developer not found.', 409);
  }

  // const foundDeveloper: TDeveloper = queryResult.rows[0];

  // res.locals = { ...res.locals, foundDeveloper };

  return next();
};
