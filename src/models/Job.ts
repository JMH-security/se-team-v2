import mongoose, { Schema, model } from "mongoose";

interface CustomField {
	fieldNumber: number;
	value: string;
}

interface JobTier {
	tierId: string;
	tierValue: string;
	tierValueDescription: string;
}

interface Address {
	address1: string;
	address2?: string;
	city: string;
	state: string;
	zip: string;
}

interface JobDocument {
	_id?: string;
	jobId?: string;
	companyNumber?: number;
	hoursRuleId: number;
	jobNumber: string;
	jobDescription: string;
	locationId: number;
	address: Address;
	taxAddress: Address;
	jobAttention?: string;
	typeId: number;
	supervisorId: number;
	salesTaxStateId: number;
	jobPayrollTaxStateId: number;
	hoursCategoryId: number;
	jobTier: JobTier[];
	taxesInsuranceId?: number;
	customFields?: CustomField[];
	isAvalaraClient?: boolean;
	customerId: string;
	regionId: string;
	branchId: number;
	timeKeepingJob?: boolean;
	timeSheetTypeId?: number;
}

const jobSchema = new mongoose.Schema<JobDocument>(
	{
		jobNumber: { type: String, required: [true, "Job Number is required"] },
		jobDescription: {
			type: String,
			required: [true, "Job Description is required"],
		},
		customerId: { type: String, required: [true, "Customer ID is required"] },
		jobId: { type: String, required: false },
		companyNumber: {
			type: Number,
			default: 1,
			required: [true, "Company Number is required"],
		},
		hoursRuleId: { type: Number, required: true },
		locationId: { type: Number, required: true },
		address: {
			address1: { type: String, required: true },
			address2: { type: String, required: false },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip: { type: String, required: true },
		},
		taxAddress: {
			address1: { type: String, required: true },
			address2: { type: String, required: false },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip: { type: String, required: true },
		},
		jobAttention: { type: String, required: false },
		typeId: { type: Number, required: true },
		supervisorId: { type: Number, required: true },
		salesTaxStateId: { type: Number, required: true },
		jobPayrollTaxStateId: { type: Number, required: true },
		hoursCategoryId: { type: Number, required: true },
		jobTier: [
			{
				tierId: { type: String, required: true },
				tierValue: { type: String, required: true },
				tierValueDescription: { type: String, required: true },
			},
		],
		taxesInsuranceId: { type: Number, required: false },
		customFields: [
			{
				fieldNumber: { type: Number, required: true },
				value: { type: String, required: true },
			},
		],
		isAvalaraClient: { type: Boolean, required: false },
		regionId: { type: String, required: true },
		branchId: { type: Number, required: true },
		timeKeepingJob: { type: Boolean, required: false },
		timeSheetTypeId: { type: Number, required: false },
	},
	{
		timestamps: true,
	}
);

const Job =
	mongoose.models?.Job || mongoose.model<JobDocument>("Job", jobSchema);

export default Job;
