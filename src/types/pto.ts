export type PTOStatus = "pending" | "approved" | "denied";

export interface TPTORequest {
	_id?: string;
	userId: string;
	userEmail: string;
	userName: string;
	startDate: Date | string;
	endDate: Date | string;
	totalHours: number;
	reason?: string;
	status: PTOStatus;
	reviewedBy?: string;
	reviewedByName?: string;
	reviewedAt?: Date | string;
	reviewNotes?: string;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

export interface TPTORequestLog {
	_id?: string;
	ptoRequestId: string;
	action: "created" | "approved" | "denied" | "updated";
	performedBy: string;
	performedByName: string;
	performedByEmail: string;
	details?: string;
	createdAt?: Date | string;
}
