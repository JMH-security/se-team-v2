import mongoose, { Schema, model } from "mongoose";

export interface tier6Document {
	tierValue: string;
	tierValueDescription: string;
}

const tier6Schema = new Schema<tier6Document>(
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
const tier6 =
	mongoose.models?.tier6 || model<tier6Document>("tier6", tier6Schema);
export default tier6;
