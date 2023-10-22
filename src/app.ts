import 'dotenv/config';
import 'express-async-errors';
import express, { Application } from 'express';
import { routes } from './routes/index.route';
import { handleError } from './middlewares/handleError';

const app: Application = express();

app.use(express.json());

app.use('/', routes);

app.use(handleError);

export default app;
