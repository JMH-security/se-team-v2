import mongoose, { Schema, model } from "mongoose";

export interface HoursCategoryDocument {
	hoursCategoryId: string;
	hoursCategoryName: string;
}

const HoursCategorySchema = new Schema<HoursCategoryDocument>(
	{
		hoursCategoryId: {
			type: String,
			required: true,
			unique: [true, "Sales Tax State ID Number in Use"],
		},
		hoursCategoryName: {
			type: String,
			required: [true, "Sales Tax State Name is required"],
		},
	},
	{
		timestamps: true,
	}
);
const HoursCategory =
	mongoose.models?.HoursCategory ||
	model<HoursCategoryDocument>("HoursCategory", HoursCategorySchema);
export default HoursCategory;
