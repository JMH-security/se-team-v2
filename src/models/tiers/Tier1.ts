import mongoose, { Schema, model } from "mongoose";

export interface Tier1Document {
	tierValue: string;
	tierValueDescription: string;
}

const Tier1Schema = new Schema<Tier1Document>(
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
const Tier1 =
	mongoose.models?.Tier1 || model<Tier1Document>("Tier1", Tier1Schema);
export default Tier1;
