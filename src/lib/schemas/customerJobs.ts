import { z } from "zod";

export const customerJobsListSchema = z.object({
	jobId: z.string().optional(),
	jobNumber: z.string().optional(),
});

export const customerJobsSchema = z.object({
	customerId: z.string().min(1, "Customer ID is required"),
	customerNumber: z.string().min(1, "Customer number is required"),
	customerJobsList: z.array(customerJobsListSchema).optional(),
});

export type CustomerJobsFormData = z.infer<typeof customerJobsSchema>;
