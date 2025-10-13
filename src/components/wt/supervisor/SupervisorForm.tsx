"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supervisorSchema } from "@/lib/schemas/supervisorSchema";
import { Supervisor } from "@/types/supervisor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SupervisorFormProps {
	initialData?: Supervisor;
}

export default function SupervisorForm({ initialData }: SupervisorFormProps) {
	const router = useRouter();
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
			const response = await fetch("/api/admin/wt/supervisors", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) throw new Error("Failed to save supervisor");
			router.push("/seteam/admin/wt/supervisors");
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
					{initialData ? "Update" : "Create"} Supervisor
				</Button>
			</form>
		</Form>
	);
}
