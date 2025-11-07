import { z } from "zod";

export const tier4Schema = z.object({
	tierValue: z.string().min(1, "Tier Value is required"),
	tierValueDescription: z.string().min(5, "Tier Value Description is required"),
});

export type Tier4FormData = z.infer<typeof tier4Schema>;
