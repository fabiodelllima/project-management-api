import { Request, Response } from 'express';
import { TDeveloperInfos } from '../interfaces/developerInfos.interface';
import { createDeveloperInfosService } from '../services/developerInfos.service';

export const createDeveloperInfosController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloperInfos =
    await createDeveloperInfosService(
      req.body,
      Number(req.params.id)
    );

  return res.status(201).json(developer);
};
