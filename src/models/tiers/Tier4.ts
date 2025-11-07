import mongoose, { Schema, model } from "mongoose";

export interface tier4Document {
	tierValue: string;
	tierValueDescription: string;
}

const tier4Schema = new Schema<tier4Document>(
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
const tier4 =
	mongoose.models?.tier4 || model<tier4Document>("tier4", tier4Schema);
export default tier4;
