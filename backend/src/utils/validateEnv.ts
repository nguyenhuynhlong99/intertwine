import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  SESSION_SECRET: str(),
});
