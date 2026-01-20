import { z } from "zod";

export const ptoRequestSchema = z.object({
	_id: z.string().optional(),
	userId: z.string().min(1, { message: "User ID is required" }),
	userEmail: z.string().email({ message: "Valid email is required" }),
	userName: z.string().min(1, { message: "User name is required" }),
	startDate: z.string().or(z.date()),
	endDate: z.string().or(z.date()),
	totalHours: z.number().min(1, { message: "Total hours must be at least 1" }),
	reason: z.string().optional(),
	status: z.enum(["pending", "approved", "denied"]).default("pending"),
	reviewedBy: z.string().optional(),
	reviewedByName: z.string().optional(),
	reviewedAt: z.string().or(z.date()).optional(),
	reviewNotes: z.string().optional(),
});

export const ptoApprovalSchema = z.object({
	status: z.enum(["approved", "denied"]),
	reviewNotes: z.string().optional(),
});

export type PTORequestFormData = z.infer<typeof ptoRequestSchema>;
export type PTOApprovalFormData = z.infer<typeof ptoApprovalSchema>;
