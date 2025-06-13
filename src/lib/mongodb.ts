
//COUNTER RELATED

import mongoose from 'mongoose';

const MONGO_URI = process.env.CONNECTIONSTRING || 'mongodb://localhost:27017/jobCounterDB';

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI as string);
    return { db: mongoose.connection.db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}