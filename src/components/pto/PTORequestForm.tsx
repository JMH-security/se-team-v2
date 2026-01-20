"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";

// Schema & Types
import { ptoRequestSchema, PTORequestFormData } from "@/lib/schemas/ptoSchema";
import { usePTO } from "@/contexts/PTOContext";
import { cn } from "@/lib/utils";

interface PTORequestFormProps {
	userId: string;
	userEmail: string;
	userName: string;
	onSuccess?: () => void;
}

// Calculate working days between two dates (excluding weekends)
function calculateWorkingDays(startDate: Date, endDate: Date): number {
	let count = 0;
	const current = new Date(startDate);

	while (current <= endDate) {
		const dayOfWeek = current.getDay();
		// 0 = Sunday, 6 = Saturday
		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			count++;
		}
		current.setDate(current.getDate() + 1);
	}

	return count;
}

export default function PTORequestForm({
	userId,
	userEmail,
	userName,
	onSuccess,
}: PTORequestFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [calculatedHours, setCalculatedHours] = useState(0);
	const { createPTORequest } = usePTO();

	const form = useForm<PTORequestFormData>({
		resolver: zodResolver(ptoRequestSchema),
		mode: "onBlur",
		defaultValues: {
			userId,
			userEmail,
			userName,
			startDate: "",
			endDate: "",
			totalHours: 0,
			reason: "",
			status: "pending",
		},
	});

	const startDate = form.watch("startDate");
	const endDate = form.watch("endDate");

	// Calculate hours when dates change
	useEffect(() => {
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);

			if (start <= end) {
				const workingDays = calculateWorkingDays(start, end);
				const hours = workingDays * 8; // 8 hours per day
				setCalculatedHours(hours);
				form.setValue("totalHours", hours);
			}
		}
	}, [startDate, endDate, form]);

	const onSubmit = async (data: PTORequestFormData) => {
		setIsSubmitting(true);
		try {
			await createPTORequest(data);
			toast.success("PTO request submitted successfully!");
			form.reset({
				userId,
				userEmail,
				userName,
				startDate: "",
				endDate: "",
				totalHours: 0,
				reason: "",
				status: "pending",
			});
			setCalculatedHours(0);
			onSuccess?.();
		} catch (error) {
			console.error("Error submitting PTO request:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to submit PTO request"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* User Information (Read-only) */}
				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">
						Employee Information
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<FormLabel>Name</FormLabel>
							<Input value={userName} disabled className="bg-muted" />
						</div>
						<div>
							<FormLabel>Email</FormLabel>
							<Input value={userEmail} disabled className="bg-muted" />
						</div>
					</div>
				</div>

				{/* PTO Details */}
				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">
						PTO Request Details
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="startDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Start Date *</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(new Date(field.value), "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value ? new Date(field.value) : undefined}
												onSelect={(date) =>
													field.onChange(date ? date.toISOString() : "")
												}
												disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>End Date *</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(new Date(field.value), "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value ? new Date(field.value) : undefined}
												onSelect={(date) =>
													field.onChange(date ? date.toISOString() : "")
												}
												disabled={(date) => {
													const start = startDate ? new Date(startDate) : new Date();
													return date < start;
												}}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="totalHours"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total Hours *</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) =>
												field.onChange(
													e.target.value ? Number(e.target.value) : 0
												)
											}
											min={1}
										/>
									</FormControl>
									<FormDescription>
										Calculated: {calculatedHours} hours ({calculatedHours / 8} working days at 8 hrs/day, excluding weekends). Adjust manually if needed.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="reason"
							render={({ field }) => (
								<FormItem className="lg:col-span-2">
									<FormLabel>Reason (Optional)</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter reason for PTO request..."
											className="resize-none"
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex gap-4">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit PTO Request"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
