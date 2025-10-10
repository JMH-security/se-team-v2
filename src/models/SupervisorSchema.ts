import mongoose from "mongoose";
const { schema } = mongoose;

export const SupervisorSchema = new Schema(
	{
		supervisorId: { type: String, required: true, unique: true },
		supervisorName: { type: String, required: true },
		supervisorEmail: { type: String, required: true },
		supervisorCell: { type: String },
	},
	{ timestamps: true }
);
