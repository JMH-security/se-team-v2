import { z } from "zod";

export const regionSchema = z.object({
	regionId: z.string().min(1, "Region ID is required"),
	regionName: z.string().min(1, "Region name is required"),
	regionDescription: z.string().optional(),
});
