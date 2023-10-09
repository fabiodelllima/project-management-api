import { Router } from 'express';
import { createDeveloperService } from '../services/developers.service';

export const developersRoutes: Router = Router();

developersRoutes.post('/', createDeveloperService);
