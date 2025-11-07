import mongoose, { Schema, model } from "mongoose";

export interface tier3Document {
	tierValue: string;
	tierValueDescription: string;
}

const tier3Schema = new Schema<tier3Document>(
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
const tier3 =
	mongoose.models?.tier3 || model<tier3Document>("tier3", tier3Schema);
export default tier3;
