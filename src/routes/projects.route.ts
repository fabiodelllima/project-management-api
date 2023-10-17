import { Router } from 'express';
import { verifyProjectId } from '../middlewares/verifyProjectId.middleware';
import { verifyProjectBodyId } from '../middlewares/verifyProjectBodyId.middleware';
import {
  createProjectController,
  readProjectController,
  updateProjectController,
} from '../controllers/projects.controller';

export const projectsRoutes: Router = Router();

projectsRoutes.post(
  '/',
  verifyProjectBodyId,
  createProjectController
);

projectsRoutes.get(
  '/:id',
  verifyProjectId,
  readProjectController
);

projectsRoutes.patch(
  '/:id',
  verifyProjectBodyId,
  verifyProjectId,
  updateProjectController
);
