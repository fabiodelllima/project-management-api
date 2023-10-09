import { Router } from 'express';
import { developersRoutes } from '../routes/developers.route';

export const routes: Router = Router();

routes.use('/developers', developersRoutes);
