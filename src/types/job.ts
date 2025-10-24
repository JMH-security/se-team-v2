type JobTiers = {
	tierID: number;
	tierValue: string;
	tierValueDescription: string;
};

type CustomFields = {
	fieldNumber: number;
	value: string;
};

type Links = {
	rel: string;
	href: string;
	method: string;
};

type Job = {
	links: Links[];
	jobJoinedDescription: string | null;
	locationId: number;
	companyNumber: number;
	lighthouseApplication: string | null;
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
	jobTiers: JobTiers[];
	customFields: CustomFields[];
	jobNumber: string;
	parentJobNumber: string | null;
	jobId: string;
	jobDescription: string;
};

type JobResponse = {
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalCount: number;
	results: Job[];
};

type JobData = {
	data: JobResponse[];
};

export type { JobData, Job, JobResponse };
