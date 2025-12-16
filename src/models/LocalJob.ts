import mongoose, { Schema, model } from "mongoose";

export interface ILocalJobDocument {
	localJobId: string;
	localJobName: string;
	localJobDescription: string;
}

const LocalJobSchema = new Schema<ILocalJobDocument>(
	{
		localJobId: { type: String, required: true },
		localJobName: { type: String, required: true },
		localJobDescription: { type: String },
	},
	{
		timestamps: true,
	}
);

const LocalJob =
	mongoose.models.LocalJob ||
	model<ILocalJobDocument>("LocalJob", LocalJobSchema);
export default LocalJob;
