import { z } from "zod";

const USPhoneRegex =
	/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

export const vendorContactSchema = z.object({
	DisplayName: z.string().optional(),
	FirstName: z.string().optional(),
	LastName: z.string().optional(),
	Email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
	BusinessPhone: z.number().optional(),
	RoleId: z.number().optional(),
	TypeId: z.number().optional(),
});

export const vendorAddressSchema = z.object({
	Address1: z.string().optional(),
	Address2: z.string().optional(),
	City: z.string().optional(),
	State: z.string().optional(),
	Zip: z.string().optional(),
});

export const vendorCustomFieldSchema = z.object({
	fieldNumber: z.number().optional(),
	value: z.string().optional(),
});

export const vendorSchema = z.object({
	_id: z.string().optional(),
	VendorNumber: z.number().int().optional().nullable(),
	VendorName: z.string().min(1, { message: "Vendor name is required" }),
	VendorTypeId: z.number().int().optional().nullable(),
	VendorStatus: z.boolean().default(true),
	Address: vendorAddressSchema.optional(),
	Phone: z
		.string()
		.refine((val) => val === "" || USPhoneRegex.test(val), {
			message: "Invalid phone number format",
		})
		.optional()
		.or(z.literal("")),
	Fax: z
		.string()
		.refine((val) => val === "" || USPhoneRegex.test(val), {
			message: "Invalid fax number format",
		})
		.optional()
		.or(z.literal("")),
	ParentVendorNumber: z.number().int().optional().nullable(),
	AccountNumber: z.string().optional(),
	TaxID: z.string().optional(),
	ContactsInformation: z.array(vendorContactSchema).optional(),
	CustomFields: z.array(vendorCustomFieldSchema).optional(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
