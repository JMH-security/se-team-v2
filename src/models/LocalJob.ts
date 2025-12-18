import mongoose, { Schema, model } from "mongoose";

interface localJobTier {
	tierId: number;
	tierValue: string;
	tierValueDescription: string;
}

interface localJobCustomField {
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

interface TaxAddress {
	address1?: string;
	address2?: string | null;
	city?: string;
	state?: string;
	zip?: string;
	latitude?: string | null;
	longitude?: string | null;
	locationCode?: string | null;
}

interface TPosts {
	postId: string;
	postName: string;
	postHPW: number;
	postBillRate: number;
	postWageRate: number;
}

export interface ILocalJobDocument {
	_id: string;
	jobNumber: string;
	jobId: string;
	jobDescription: string;
	customerNumber: string;
	customerId: string;
	locationId: number;
	hoursRuleId: number;
	hoursCategoryId: number;
	taxesInsuranceId: number;
	salesTaxStateId: number;
	jobPayrollTaxStateId: number;
	supervisorId: number;
	jobAttention: string;
	dateToStart: Date;
	typeId: number;
	phone1: string;
	phone1Description: string;
	phone2: string;
	phone2Description: string;
	phone3: string;
	phone3Description: string;
	notes: string;
	address: Address;
	taxAddress: TaxAddress;
	jobTiers: localJobTier[];
	customFields: localJobCustomField[];
	posts: TPosts[];
	totalHpw: number;
}

const LocalJobSchema = new Schema<ILocalJobDocument>(
	{
		jobNumber: { type: String, required: true },
		jobId: { type: String, required: true },
		jobDescription: { type: String, required: true },
		customerNumber: { type: String, required: true },
		customerId: { type: String, required: true },
		locationId: { type: Number, required: true },
		hoursRuleId: { type: Number, required: true },
		hoursCategoryId: { type: Number, required: true },
		taxesInsuranceId: { type: Number, required: true },
		salesTaxStateId: { type: Number, required: true },
		jobPayrollTaxStateId: { type: Number, required: true },
		supervisorId: { type: Number, required: true },
		jobAttention: { type: String, required: true },
		dateToStart: { type: Date, required: true },
		typeId: { type: Number, required: true },
		phone1: { type: String, required: true },
		phone1Description: { type: String, required: true },
		phone2: { type: String, required: true },
		phone2Description: { type: String, required: true },
		phone3: { type: String, required: true },
		phone3Description: { type: String, required: true },
		notes: { type: String, required: true },
		address: {
			jobAddress1: { type: String, required: false },
			jobAddress2: { type: String, required: false },
			jobCity: { type: String, required: false },
			jobState: { type: String, required: false },
			jobZip: { type: String, required: false },
		},
		taxAddress: {
			address1: { type: String, required: false },
			address2: { type: String, required: false },
			city: { type: String, required: false },
			state: { type: String, required: false },
			zip: { type: String, required: false },
			latitude: { type: String, required: false },
			longitude: { type: String, required: false },
			locationCode: { type: String, required: false },
		},
		jobTiers: [
			{
				tierId: { type: Number, required: false },
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
		posts: [
			{
				postId: { type: String, required: true },
				postName: { type: String, required: true },
				postHPW: { type: Number, required: true },
				postBillRate: { type: Number, required: true },
				postWageRate: { type: Number, required: true },
			},
		],
		totalHpw: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const LocalJob =
	mongoose.models.LocalJob ||
	model<ILocalJobDocument>("LocalJob", LocalJobSchema);
export default LocalJob;
