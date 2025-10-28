import { z } from "zod";

export const taxesInsuranceSchema = z.object({
	taxesInsuranceId: z.string().min(1, "TaxesInsurance ID is required"),
	taxesInsuranceName: z.string().min(1, "Taxes Insurance name is required"),
});

export type TaxesInsuranceFormData = z.infer<typeof taxesInsuranceSchema>;
