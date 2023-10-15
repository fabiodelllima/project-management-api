import { Router } from 'express';
import { verifyEmail } from '../middlewares/verifyEmail.middleware';
import { verifyDeveloperId } from './../middlewares/verifyDeveloperId.middleware';
import { createDeveloperInfosController } from '../controllers/developerInfos.controller';
import {
  createDeveloperController,
  deleteDeveloperController,
  readDeveloperByIdController,
  updateDeveloperController,
} from '../controllers/developers.controller';
import { verifyOS } from '../middlewares/verifyOS.middleware';
import { verifyDeveloperInfo } from '../middlewares/verifyDeveloperInfo.middleware';

export const developersRoutes: Router = Router();

developersRoutes.post(
  '/',
  verifyEmail,
  createDeveloperController
);

developersRoutes.get(
  '/:id',
  verifyDeveloperId,
  readDeveloperByIdController
);

developersRoutes.patch(
  '/:id',
  verifyEmail,
  verifyDeveloperId,
  updateDeveloperController
);

developersRoutes.delete(
  '/:id',
  verifyDeveloperId,
  deleteDeveloperController
);

developersRoutes.post(
  '/:id/infos',
  verifyDeveloperInfo,
  verifyDeveloperId,
  verifyOS,
  createDeveloperInfosController
);
