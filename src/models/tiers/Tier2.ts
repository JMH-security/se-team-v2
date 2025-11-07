import mongoose, { Schema, model } from "mongoose";

export interface tier2Document {
	tierValue: string;
	tierValueDescription: string;
}

const tier2Schema = new Schema<tier2Document>(
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
const tier2 =
	mongoose.models?.tier2 || model<tier2Document>("tier2", tier2Schema);
export default tier2;
