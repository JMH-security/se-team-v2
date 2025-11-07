import { z } from "zod";

export const tier1Schema = z.object({
	tierValue: z.string().min(1, "Tier Value is required"),
	tierValueDescription: z.string().min(5, "Tier Value Description is required"),
});

export type Tier1FormData = z.infer<typeof tier1Schema>;
