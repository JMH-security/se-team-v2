// components/SupervisorForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
	supervisorSchema,
	SupervisorFormData,
} from "@/lib/schemas/supervisorSchema";
import { useSupervisor } from "@/contexts/SupervisorContext";
import { Supervisor } from "@/types/supervisor";

interface SupervisorFormProps {
	supervisor?: Supervisor;
	onSuccess?: () => void;
}

export default function SupervisorForm({
	supervisor,
	onSuccess,
}: SupervisorFormProps) {
	const { createSupervisor, updateSupervisor } = useSupervisor();

	const form = useForm<SupervisorFormData>({
		resolver: zodResolver(supervisorSchema),
		defaultValues: {
			supervisorId: supervisor?.supervisorId || "",
			supervisorName: supervisor?.supervisorName || "",
			supervisorEmail: supervisor?.supervisorEmail || "",
			supervisorCell: supervisor?.supervisorCell || "",
		},
	});

	const onSubmit = async (data: SupervisorFormData) => {
		try {
			if (supervisor) {
				await updateSupervisor(supervisor._id, data);
			} else {
				await createSupervisor(data);
				// reset form only after successful create
				form.reset({
					supervisorId: "",
					supervisorName: "",
					supervisorEmail: "",
					supervisorCell: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values for correction
			console.error("Supervisor submit failed", err);
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
							<FormLabel>Name</FormLabel>
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
							<FormLabel>Name</FormLabel>
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
				<Button type="submit">{supervisor ? "Update" : "Create"}</Button>
			</form>
		</Form>
	);
}
