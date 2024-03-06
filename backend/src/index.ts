import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import connectDB from '../src/db/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { v2 as cloudinary } from 'cloudinary';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import env from './utils/validateEnv.js';
import MongoStore from 'connect-mongo';
import { job } from './cron.js';

connectDB();

const app = express();

app.use(cors());

job.start();

const PORT = env.PORT || 6000;

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(
  ExpressMongoSanitize({
    allowDots: true,
    replaceWith: '_',
  })
);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
