import { Request, Response } from 'express';
import {
  createProjectService,
  readProjectByIdService,
  updateProjectService,
} from '../services/projects.service';
import { TProject } from '../interfaces/projects.interface';

export const createProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: TProject = await createProjectService(
    req.body,
    Number(req.params.id)
  );

  return res.status(201).json(project);
};

export const readProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: TProject = await readProjectByIdService(
    req.params.id
  );

  return res.status(200).json(project);
};

export const updateProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project: TProject = await updateProjectService(
    req.params.id,
    req.body
  );

  return res.status(200).json(project);
};
