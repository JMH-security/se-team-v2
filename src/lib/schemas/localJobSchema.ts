import { z } from "zod";

// Regex that allows common US formats (spaces, hyphens, parentheses are optional)
const USPhoneRegex =
	/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

export const localJobCustomFieldSchema = z.object({
	fieldNumber: z.number().optional(),
	value: z.string().optional(),
});

export const localJobTierSchema = z.object({
	tierId: z
		.number()
		.int()
		.min(1, "tierID must be an integer between 1 and 24")
		.max(24, "tierID must be an integer between 1 and 24")
		.optional(),
	tierValue: z.string({ message: "Choose Tier Value" }),
	tierValueDescription: z
		.string()
		.min(4, "tierValueDescription must be longer than 3 characters")
		.optional(),
});

export const localJobAddressSchema = z
	.object({
		jobAddress1: z.string().nullable().optional(),
		jobAddress2: z.string().nullable().optional(),
		jobCity: z.string().nullable().optional(),
		jobState: z.string().nullable().optional(),
		jobZip: z.string().nullable().optional(),
	})
	.nullable()
	.optional();

export const localJobTaxAddressSchema = z
	.object({
		address1: z.string().nullable().optional(),
		address2: z.string().nullable().optional(),
		city: z.string().nullable().optional(),
		state: z.string().nullable().optional(),
		zip: z.string().nullable().optional(),
		latitude: z.string().nullable().optional(),
		longitude: z.string().nullable().optional(),
		locationCode: z.string().nullable().optional(),
	})
	.nullable()
	.optional();

export const localJobPosts = {
	postId: z.string(),
	postName: z.string(),
	postHpw: z.number().nonnegative(),
	postBillRate: z
		.number()
		.multipleOf(0.01, { message: "Currency Value; At most 2 decimal values" })
		.nonnegative(),
	postWageRate: z
		.number()
		.multipleOf(0.01, { message: "Currency Value; At most 2 decimal values" })
		.nonnegative(),
};

export const localJobSchema = z.object({
	_id: z.string().optional(),
	jobNumber: z.string().optional(),
	jobId: z.string().optional(),
	jobDescription: z.string().min(1, { message: "Enter Job Name/Description" }),
	customerNumber: z.string({ message: "Customer Number required" }),
	customerId: z.string({ message: "Customer ID required" }),
	locationId: z.number({ message: "Select Location" }),
	hoursRuleId: z.number({ message: "Select Hours Rule" }),
	hoursCategoryId: z
		.number({ message: "Select Hours Category" })
		.nullable()
		.optional(),
	taxesInsuranceId: z
		.number({ message: "Select Taxes Insurance" })
		.nullable()
		.optional(),
	salesTaxStateId: z
		.number({ message: "Select Sales Tax State" })
		.nullable()
		.optional(),
	jobPayrollTaxStateId: z
		.number({ message: "Select Payroll Tax State" })
		.nullable()
		.optional(),
	supervisorId: z
		.number({ message: "Select Supervisor" })
		.nullable()
		.optional(),
	jobAttention: z.string({ message: "Enter Job Contact Person Name" }).min(4),
	jobContactEmail: z.string({ message: "Enter Job Contact Email" }).email({ message: "Enter a valid email address" }),
	dateToStart: z.coerce
		.date({ message: "Enter Valid Start Date" })
		.min(new Date(), { message: "Start Date cannot be in the past" }),
	typeId: z.number({ message: "Set Job Active" }),
	phone1: z.string().refine((val) => USPhoneRegex.test(val), {
		message: "Invalid US phone number format.",
	}),
	phone1Description: z.string().nullable().optional(),
	phone2: z.string().refine((val) => val === "" || USPhoneRegex.test(val), {
		message: "Invalid US phone number format.",
	}),
	phone2Description: z.string().nullable().optional(),
	phone3: z.string().refine((val) => val === "" || USPhoneRegex.test(val), {
		message: "Invalid US phone number format.",
	}),
	phone3Description: z.string().nullable().optional(),
	notes: z.string(),
	address: localJobAddressSchema,
	taxAddress: localJobTaxAddressSchema,
	customFields: z.array(localJobCustomFieldSchema).optional(),
	jobTiers: z.array(localJobTierSchema).optional(),
	tier1Value: z.string().optional(),
	tier2Value: z.string().optional(),
	tier3Value: z.string().optional(),
	tier4Value: z.string().optional(),
	tier5Value: z.string().optional(),
	tier6Value: z.string().optional(),
	tier7Value: z.string().optional(),
	posts: z.array(z.object(localJobPosts)).optional(),
	totalHpw: z.number().nonnegative(),
});

export type LocalJobFormData = z.infer<typeof localJobSchema>;
