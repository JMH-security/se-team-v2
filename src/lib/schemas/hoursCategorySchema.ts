import { z } from "zod";

export const hoursCategorySchema = z.object({
	hoursCategoryId: z.string().min(1, "Sales Tax State ID is required"),
	hoursCategoryName: z.string().min(2, "Tax State Name is required"),
});

export type HoursCategoryFormData = z.infer<typeof hoursCategorySchema>;
