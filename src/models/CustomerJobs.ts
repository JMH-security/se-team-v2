import mongoose, { Schema, model } from "mongoose";

interface CustomerJobsList {
	jobId: string;
	jobNumber: string;
}

export interface ICustomerJobsDocument {
	_id: string;
	customerId: string;
	customerNumber: string;
	customerJobsList?: CustomerJobsList[];
}

const CustomerJobsSchema = new Schema<ICustomerJobsDocument>(
	{
		customerId: { type: String, required: true },
		customerNumber: { type: String },
		customerJobsList: { type: Array },
	},
	{
		timestamps: true,
	}
);

const CustomerJobs =
	mongoose.models?.CustomerJobs ||
	model<ICustomerJobsDocument>("CustomerJobs", CustomerJobsSchema);
export default CustomerJobs;
