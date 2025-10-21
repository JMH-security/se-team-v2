"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supervisorSchema } from "@/lib/schemas/supervisorSchema";
import { Supervisor } from "@/types/supervisor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Table imports not needed in this form component
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { useState } from "react";

interface SupervisorFormProps {
	initialData?: Supervisor;
	onSuccess?: () => void;
}

export default function SupervisorForm({
	initialData,
	onSuccess,
}: SupervisorFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		resolver: zodResolver(supervisorSchema),
		defaultValues: initialData || {
			supervisorId: "",
			supervisorName: "",
			supervisorEmail: "",
			supervisorCell: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof supervisorSchema>) => {
		setIsSubmitting(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/wt/supervisors`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);
			if (!response.ok) throw new Error("Failed to save supervisor");

			// Reset the form to initialData (if provided) or to empty values
			form.reset(
				initialData || {
					supervisorId: "",
					supervisorName: "",
					supervisorEmail: "",
					supervisorCell: "",
				}
			);

			// Call the optional success callback so parent can refresh lists
			onSuccess?.();
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="rounded-t-md border py-1.5 text-sm font-semibold text-center text-primary bg-red-800">
				<h1>Add Supervisor</h1>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<FormField
						control={form.control}
						name="supervisorId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Supervisor ID</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="supervisorName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Supervisor Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="supervisorEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="supervisorCell"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Cell</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isSubmitting}>
						Add Supervisor
					</Button>
				</form>
			</Form>
		</>
	);
}
