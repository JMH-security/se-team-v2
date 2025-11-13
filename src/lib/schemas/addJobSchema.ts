import { z } from "zod";

export const addJobTierSchema = z.object({
	tierID: z
		.number()
		.int()
		.min(1, "tierID must be an integer between 1 and 24")
		.max(24, "tierID must be an integer between 1 and 24")
		.optional(),
	tierValue: z.string().optional(),
	tierValueDescription: z
		.string()
		.min(4, "tierValueDescription must be longer than 3 characters")
		.optional(),
});

export const addJobCustomFieldSchema = z.object({
	fieldNumber: z.number().optional(),
	value: z.string().optional(),
});

export const addJobAddressSchema = z
	.object({
		jobAddress1: z.string().nullable().optional(),
		jobAddress2: z.string().nullable().optional(),
		jobCity: z.string().nullable().optional(),
		jobState: z.string().nullable().optional(),
		jobZip: z.string().nullable().optional(),
	})
	.nullable()
	.optional();

export const addJobTaxAddressSchema = z
	.object({
		address1: z.string().nullable().optional(),
		address2: z.string().nullable().optional(),
		city: z.string().nullable().optional(),
		state: z.string().nullable().optional(),
		zip: z.string().nullable().optional(),
	})
	.nullable()
	.optional();

export const addJobSchema = z.object({
	_id: z.string().uuid().optional(),
	jobNumber: z.string().optional(),
	jobId: z.string().nullable().optional(),
	jobDescription: z.string().min(1).optional(),
	locationId: z.number().optional(),
	companyNumber: z.number().optional(),
	hoursRuleId: z.number({ message: "Must Select Hours Rule" }),
	jobAttention: z.string().nullable().optional(),
	dateToStart: z.string().nullable().optional(),
	typeId: z.number().nullable().optional(),
	phone1: z.string().nullable().optional(),
	phone1Description: z.string().nullable().optional(),
	phone2: z.string().nullable().optional(),
	phone2Description: z.string().nullable().optional(),
	phone3: z.string().nullable().optional(),
	phone3Description: z.string().nullable().optional(),
	supervisorId: z.number().nullable().optional(),
	taxesInsuranceId: z.number().nullable().optional(),
	salesTaxStateId: z.number().nullable().optional(),
	jobPayrollTaxStateID: z.number().nullable().optional(),
	hoursCategoryID: z.number().nullable().optional(),
	notes: z.string().nullable().optional(),
	address: addJobAddressSchema,
	taxAddress: addJobTaxAddressSchema,
	jobTiers: z.array(addJobTierSchema).optional(),
	customFields: z.array(addJobCustomFieldSchema).optional(),
	parentJobNumber: z.string().nullable().optional(),
	tier1Value: z.string().nullable().optional(),
	tier2Value: z.string().nullable().optional(),
	tier3Value: z.string().nullable().optional(),
	tier4Value: z.string().nullable().optional(),
	tier5Value: z.string().nullable().optional(),
	tier6Value: z.string().nullable().optional(),
	tier7Value: z.string().nullable().optional(),
});

export type AddJobFormData = z.infer<typeof addJobSchema>;

export default addJobSchema;
