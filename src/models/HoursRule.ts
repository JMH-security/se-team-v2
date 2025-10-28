import mongoose, { Schema, model } from "mongoose";

export interface HoursRuleDocument {
	hoursRuleId: string;
	hoursRuleName: string;
}

const HoursRuleSchema = new Schema<HoursRuleDocument>(
	{
		hoursRuleId: {
			type: String,
			required: true,
			unique: [true, "Sales Tax State ID Number in Use"],
		},
		hoursRuleName: {
			type: String,
			required: [true, "Sales Tax State Name is required"],
		},
	},
	{
		timestamps: true,
	}
);
const HoursRule =
	mongoose.models?.HoursRule ||
	model<HoursRuleDocument>("HoursRule", HoursRuleSchema);
export default HoursRule;
