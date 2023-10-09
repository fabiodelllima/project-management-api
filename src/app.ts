import 'dotenv/config';
import express, { Application } from 'express';
import { routes } from './services/index.route';

const app: Application = express();

app.use(express.json());

app.use('/', routes);

export default app;
