type AddJobTiers = {
	tierID: number;
	tierValue: string;
	tierValueDescription: string;
};

type AddJobCustomFields = {
	fieldNumber: number;
	value: string;
};

type TAddJob = {
	_id: string;
	jobNumber: string;
	jobId: string | null;
	jobDescription: string;
	locationId: number;
	companyNumber: number;
	hoursRuleId: number;
	jobAttention: string | null;
	dateToStart: string | null;
	typeId: number | null;
	phone1: string;
	phone1Description: string;
	phone2: string | null;
	phone2Description: string | null;
	phone3: string | null;
	phone3Description: string | null;
	supervisorId: number | null;
	taxesInsuranceId: number | null;
	salesTaxStateId: number | null;
	jobPayrollTaxStateId: number | null;
	hoursCategoryId: number | null;
	notes: string | null;
	address: {
		jobAddress1: string;
		jobAddress2: string;
		jobCity: string;
		jobState: string;
		jobZip: string;
	} | null;
	taxAddress: {
		address1: string | null;
		address2: string | null;
		city: string | null;
		state: string | null;
		zip: string | null;
	} | null;
	jobTiers?: AddJobTiers[];
	customFields?: AddJobCustomFields[];
	parentJobNumber: string | null;
	tier1Value: string | null;
	jobContactEmail: string | null;
};

export type { TAddJob, AddJobTiers, AddJobCustomFields };
