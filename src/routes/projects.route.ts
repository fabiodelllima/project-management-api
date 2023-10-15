import { Router } from 'express';
import {
  createProjectController,
  readProjectController,
  updateProjectController,
} from '../controllers/projects.controller';
import { verifyDeveloperId } from '../middlewares/verifyDeveloperId.middleware';
import { verifyProjectId } from '../middlewares/verifyProjectId.middleware';

export const projectsRoutes: Router = Router();

projectsRoutes.post(
  '/',
  // verifyDeveloperId,
  // verifyProjectId,
  createProjectController
);

projectsRoutes.get(
  '/:id',
  verifyProjectId,
  readProjectController
);

projectsRoutes.patch(
  '/:id',
  // verifyProjectId,
  verifyDeveloperId,
  updateProjectController
);
