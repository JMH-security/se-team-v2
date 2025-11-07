import mongoose, { Schema, model } from "mongoose";

export interface tier7Document {
	tierValue: string;
	tierValueDescription: string;
}

const tier7Schema = new Schema<tier7Document>(
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
const tier7 =
	mongoose.models?.tier7 || model<tier7Document>("tier7", tier7Schema);
export default tier7;
