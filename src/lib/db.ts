import mongoose from "mongoose";
const { CONNECTIONSTRING } = process.env;

const connectDB = async () => {
	try {
		const { connection } = await mongoose.connect(CONNECTIONSTRING as string);
		if (connection.readyState === 1) {
			console.log("MongoDB Ready State");
			return Promise.resolve(true);
		}
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export { connectDB };
export default connectDB;
