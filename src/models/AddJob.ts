import mongoose from "mongoose";

interface JobAddTier {
	tierID: number;
	tierValue: string;
	tierValueDescription: string;
}

interface JobAddCustomField {
	fieldNumber: number;
	value: string;
}

interface Address {
	jobAddress1?: string | null;
	jobAddress2?: string | null;
	jobCity?: string | null;
	jobState?: string | null;
	jobZip?: string | null;
}

interface TaxAddress extends Address {
	latitude?: string | null;
	longitude?: string | null;
	locationCode?: string | null;
}

export interface AddJobDocument {
	jobNumber: string;
	jobId?: string | null;
	jobDescription: string;
	locationId: number;
	companyNumber: string;
	hoursRuleId?: number | null;
	jobAttention?: string | null;
	dateToStart?: string | null;
	typeId?: number | null;
	phone1?: string | null;
	phone1Description?: string | null;
	phone2?: string | null;
	phone2Description?: string | null;
	phone3?: string | null;
	phone3Description?: string | null;
	supervisorId?: number | null;
	taxesInsuranceId?: number | null;
	salesTaxStateId?: number | null;
	jobPayrollTaxStateID?: number | null;
	hoursCategoryID?: number | null;
	notes?: string | null;
	address?: Address | null;
	taxAddress?: TaxAddress | null;
	jobTiers?: JobAddTier[];
	customFields?: JobAddCustomField[];
	parentJobNumber?: string | null;
}

const AddJobSchema = new mongoose.Schema<AddJobDocument>(
	{
		jobNumber: { type: String, required: true },
		jobId: { type: String, required: false },
		jobDescription: { type: String, required: false },
		locationId: { type: Number, required: false },
		companyNumber: { type: String, required: false },
		hoursRuleId: { type: Number, required: false },
		jobAttention: { type: String, required: false },
		dateToStart: { type: String, required: false },
		typeId: { type: Number, required: false },
		phone1: { type: String, required: false },
		phone1Description: { type: String, required: false },
		phone2: { type: String, required: false },
		phone2Description: { type: String, required: false },
		phone3: { type: String, required: false },
		phone3Description: { type: String, required: false },
		supervisorId: { type: Number, required: false },
		taxesInsuranceId: { type: Number, required: false },
		salesTaxStateId: { type: Number, required: false },
		jobPayrollTaxStateID: { type: Number, required: false },
		hoursCategoryID: { type: Number, required: false },
		notes: { type: String, required: false },
		address: {
			jobAddress1: { type: String, required: false },
			jobAddress2: { type: String, required: false },
			jobCity: { type: String, required: false },
			jobState: { type: String, required: false },
			jobZip: { type: String, required: false },
		},
		taxAddress: {
			jobAddress1: { type: String, required: false },
			jobAddress2: { type: String, required: false },
			jobCity: { type: String, required: false },
			jobState: { type: String, required: false },
			jobZip: { type: String, required: false },
			latitude: { type: String, required: false },
			longitude: { type: String, required: false },
			locationCode: { type: String, required: false },
		},
		jobTiers: [
			{
				tierID: { type: Number, required: false },
				tierValue: { type: String, required: false },
				tierValueDescription: { type: String, required: false },
			},
		],
		customFields: [
			{
				fieldNumber: { type: Number, required: false },
				value: { type: String, required: false },
			},
		],
		parentJobNumber: { type: String, required: false },
	},
	{ timestamps: true }
);

const AddJob =
	mongoose.models?.AddJob ||
	mongoose.model<AddJobDocument>("AddJob", AddJobSchema);

export default AddJob;
