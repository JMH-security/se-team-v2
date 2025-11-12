// this is for the auto index for jobs, etc.

export interface ICounter {
	_id: string;
	index: number;
	prefix: string;
	createdAt: Date;
	updatedAt: Date;
}
