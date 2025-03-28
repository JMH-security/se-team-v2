import mongoose from "mongoose";
const { CONNECTIONSTRING } = process.env;

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(CONNECTIONSTRING as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
