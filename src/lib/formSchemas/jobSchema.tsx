import { z } from "zod";

const customFields = z
	.object({
		fieldNumber: z.number(),
		value: z.string().trim(),
	})
	.optional();

const jobTier = z
	.object({
		tierId: z.string().trim().min(2),
		tierValue: z.string().trim(),
		tierValueDescription: z.string().trim(),
	})
	.optional();

const addressSchema = z
	.object({
		address1: z
			.string()
			.trim()
			.min(5, { message: "Address must be at least 5 characters" })
			.max(50, { message: "Address must be 50 or fewer characters" })
			.optional(),
		address2: z.string().trim().optional(),
		city: z
			.string()
			.trim()
			.min(2, { message: "City must be at least 2 characters" })
			.max(50, { message: "City must be 50 or fewer characters" })
			.optional(),
		state: z
			.string()
			.trim()
			.min(2, { message: "State must be at least 2 characters" })
			.max(50, { message: "State must be 50 or fewer characters" })
			.optional(),
		zip: z
			.string()
			.trim()
			.min(5, { message: "Zip must be at least 5 characters" })
			.max(10, { message: "Zip must be 10 or fewer characters" })
			.optional(),
	})
	.optional();

export const jobFormSchema = z.object({
	jobId: z.string().trim().optional(),
	companyNumber: z.number().optional(),
	hoursRuleId: z.number({ message: "Please select a Hours Rule" }).optional(),
	jobNumber: z
		.string()
		.trim()
		.min(4, { message: "Job Number must be at least 4 characters" })
		.max(10, { message: "Job Number must be 10 or fewer characters" })
		.optional(),
	jobDescription: z
		.string()
		.trim()
		.min(10, { message: "Please provide more description" })
		.max(50, { message: "Job Description must be 50 or fewer characters" })
		.optional(),
	locationId: z.number().optional(),
	address: addressSchema.optional(),
	taxAddress: addressSchema.optional(),
	jobAttention: z.string().trim().optional(),
	typeId: z.number().optional(),
	supervisorId: z.number().optional(),
	salesTaxStateId: z.number().optional(),
	jobPayrollTaxStateId: z.number().optional(),
	hoursCategoryId: z.number().optional(),
	jobTier: z.array(jobTier).optional(),
	taxesInsuranceId: z.number().optional(),
	customFields: z.array(customFields).optional(),
	isAvalaraClient: z.boolean().optional(),
	customerId: z.string().min(30).max(40).optional(),
	regionId: z.string().optional(),
	branchId: z.number().optional(),
	timeKeepingJob: z.boolean().optional(),
	timeSheetTypeId: z.number().optional(),
});

export type JobFormData = z.infer<typeof jobFormSchema>;
