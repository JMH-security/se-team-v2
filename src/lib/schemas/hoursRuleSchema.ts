import { z } from "zod";

export const hoursRuleSchema = z.object({
	hoursRuleId: z.string().min(1, "Sales Tax State ID is required"),
	hoursRuleName: z.string().min(2, "Tax State Name is required"),
});

export type HoursRuleFormData = z.infer<typeof hoursRuleSchema>;
