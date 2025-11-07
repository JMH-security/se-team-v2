import mongoose, { Schema, model } from "mongoose";

export interface tier5Document {
	tierValue: string;
	tierValueDescription: string;
}

const tier5Schema = new Schema<tier5Document>(
	{
		tierValue: {
			type: String,
			required: true,
			unique: [true, "Tier Value in Use"],
		},
		tierValueDescription: {
			type: String,
			required: [true, "Tier Value Description is required"],
		},
	},
	{
		timestamps: true,
	}
);
const tier5 =
	mongoose.models?.tier5 || model<tier5Document>("tier5", tier5Schema);
export default tier5;
