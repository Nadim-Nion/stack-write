import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// Parser or Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Application Routes
app.use('/api', router)

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route
app.use(notFound);

export default app;
