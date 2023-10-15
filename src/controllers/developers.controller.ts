import { Request, Response } from 'express';
import {
  TDeveloper,
  TDeveloperRead,
} from '../interfaces/developers.interface';
import {
  createDeveloperService,
  readAllDevelopersService,
  readDeveloperByIdService,
  updateDeveloperService,
  deleteDeveloperService,
} from '../services/developers.service';

export const createDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloper = await createDeveloperService(
    req.body
  );

  return res.status(201).json(developer);
};

export const readAllDevelopersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developers: TDeveloperRead =
    await readAllDevelopersService();

  return res.status(200).json(developers);
};

export const readDeveloperByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloper = await readDeveloperByIdService(
    req.params.id
  );

  return res.status(200).json(developer);
};

export const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: TDeveloper = await updateDeveloperService(
    req.params.id,
    req.body
  );

  return res.status(200).json(developer);
};

export const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloperService(req.params.id);

  return res.status(204).json();
};
