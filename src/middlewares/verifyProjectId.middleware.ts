import { NextFunction, Request, Response } from 'express';
import { client } from '../database';
import AppError from '../errors/App.error';
import {
  TProject,
  TProjectResult,
} from '../interfaces/projects.interface';

export const verifyProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: TProjectResult = await client.query(
    `SELECT id FROM "projects" WHERE "id" = $1`,
    [id]
  );

  if (!queryResult.rowCount) {
    throw new AppError('Project not found.', 404);
  }

  const foundProject: TProject = queryResult.rows[0];

  res.locals = { ...res.locals, foundProject };

  return next();
};
