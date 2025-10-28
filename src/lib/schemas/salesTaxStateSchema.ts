import { z } from "zod";

export const salesTaxStateSchema = z.object({
	salesTaxStateId: z.string().min(1, "Sales Tax State ID is required"),
	salesTaxStateName: z.string().min(2, "Tax State Name is required"),
});

export type SalesTaxStateFormData = z.infer<typeof salesTaxStateSchema>;
