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
	phone1: string | null;
	phone1Description: string | null;
	phone2: string | null;
	phone2Description: string | null;
	phone3: string | null;
	phone3Description: string | null;
	supervisorId: number | null;
	taxesInsuranceId: number | null;
	salesTaxStateId: number | null;
	jobPayrollTaxStateID: number | null;
	hoursCategoryID: number | null;
	notes: string | null;
	address: {
		jobAddress1: string | null;
		jobAddress2: string | null;
		jobCity: string | null;
		jobState: string | null;
		jobZip: string | null;
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
};

export type { TAddJob, AddJobTiers, AddJobCustomFields };
