import express from 'express';
// import http from 'http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import connectDB from '../src/db/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// const server = http.createServer(app);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
