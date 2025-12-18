import { z } from "zod";

export const locationSchema = z.object({
	locationId: z.string().min(1, "Location ID is required"),
	locationDescription: z.string().optional(),
});

export type LocationFormData = z.infer<typeof locationSchema>;
