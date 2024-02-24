import mongoose from 'mongoose';
import env from '../utils/validateEnv.js';

const connectDB = async () => {
  try {
    if (!env.MONGO_URI) {
      throw new Error('mongo url not defined');
    }
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
