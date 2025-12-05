export type TJobList = {
	jobId: string;
	jobNumber: string;
};

export interface TCustomerJobs {
	_id: string;
	customerId: string;
	customerNumber: string;
	customerJobsList?: TJobList[];
}
