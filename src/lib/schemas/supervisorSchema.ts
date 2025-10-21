import { z } from "zod";

export const supervisorSchema = z.object({
	supervisorId: z.string().min(1, "Supervisor ID is required"),
	supervisorName: z.string().min(1, "Supervisor name is required"),
	supervisorEmail: z.string().email("Invalid email address"),
	supervisorCell: z.string().optional(),
});

export type SupervisorFormData = z.infer<typeof supervisorSchema>;
