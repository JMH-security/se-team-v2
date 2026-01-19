type TCustomer = {
	customerId: string;
	customerNumber: string;
	customerName: string;
};

type JobTiers = {
	tierId: number;
	tierValue: string;
	tierValueDescription: string;
};

type CustomFields = {
	fieldNumber: number;
	value: string;
};

type TPosts = {
	postId: number;
	postName: string;
	postHpw: number;
	postBillRate: number;
	postWageRate: number;
	// monPostStartTime: string | null;
	// monPostEndTime: string | null;
	// tuesPostStartTime: string | null;
	// tuesPostEndTime: string | null;
	// wedPostStartTime: string | null;
	// wedPostEndTime: string | null;
	// thursPostStartTime: string | null;
	// thursPostEndTime: string | null;
	// friPostStartTime: string | null;
	// friPostEndTime: string | null;
	// satPostStartTime: string | null;
	// satPostEndTime: string | null;
	// sunPostStartTime: string | null;
	// sunPostEndTime: string | null;
};

type TLocalJob = {
	_id: string;
	jobNumber: string | null;
	jobId: string | null;
	jobDescription: string;
	customerNumber: string;
	customerId: string;
	locationId: number;
	hoursRuleId: number | null;
	hoursCategoryId: number | null;
	taxesInsuranceId: number | null;
	salesTaxStateId: number | null;
	jobPayrollTaxStateId: number | null;
	supervisorId: number | null;
	jobAttention: string;
	dateToStart: Date;
	typeId: number | null;
	phone1: string | null;
	phone1Description: string | null;
	phone2: string | null;
	phone2Description: string | null;
	phone3: string | null;
	phone3Description: string | null;
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
	jobTiers: JobTiers[];
	customFields: CustomFields[];
	posts: TPosts[];
	totalHpw: number;
	tier1Value?: string;
	tier2Value?: string;
	tier3Value?: string;
	tier4Value?: string;
	tier5Value?: string;
	tier6Value?: string;
	tier7Value?: string;
	customer?: TCustomer;
};

export type { TLocalJob, TPosts, JobTiers, CustomFields };
