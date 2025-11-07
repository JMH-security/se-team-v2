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
	hoursRuleId: number | null;
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
		jobAddress1: string | null;
		jobAddress2: string | null;
		jobCity: string | null;
		jobState: string | null;
		jobZip: string | null;
		latitude: string | null;
		longitude: string | null;
		locationCode: string | null;
	} | null;
	jobTiers?: AddJobTiers[];
	customFields?: AddJobCustomFields[];
	parentJobNumber: string | null;
};

export type { TAddJob, AddJobTiers, AddJobCustomFields };
