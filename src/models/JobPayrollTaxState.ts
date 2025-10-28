import mongoose, { Schema, model } from "mongoose";

export interface JobPayrollTaxStateDocument {
	jobPayrollTaxStateId: string;
	jobPayrollTaxStateName: string;
}

const JobPayrollTaxStateSchema = new Schema<JobPayrollTaxStateDocument>(
	{
		jobPayrollTaxStateId: {
			type: String,
			required: true,
			unique: [true, "Sales Tax State ID Number in Use"],
		},
		jobPayrollTaxStateName: {
			type: String,
			required: [true, "Sales Tax State Name is required"],
		},
	},
	{
		timestamps: true,
	}
);
const JobPayrollTaxState =
	mongoose.models?.JobPayrollTaxState ||
	model<JobPayrollTaxStateDocument>(
		"JobPayrollTaxState",
		JobPayrollTaxStateSchema
	);
export default JobPayrollTaxState;
