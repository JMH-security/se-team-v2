import { z } from "zod";

export const jobPayrollTaxStateSchema = z.object({
	jobPayrollTaxStateId: z.string().min(1, "JobPayrollTaxState ID is required"),
	jobPayrollTaxStateName: z
		.string()
		.min(1, "Job Payroll Tax State is required"),
});

export type JobPayrollTaxStateFormData = z.infer<
	typeof jobPayrollTaxStateSchema
>;
