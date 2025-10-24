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
			supervisorDescription: supervisor?.supervisorDescription || "",
			supervisorGroup1: supervisor?.supervisorGroup1 || "",
			supervisorGroup2: supervisor?.supervisorGroup2 || "",
			supervisorGroup3: supervisor?.supervisorGroup3 || "",
			supervisorName: supervisor?.supervisorName || "",
			supervisorEmail: supervisor?.supervisorEmail || "",
			supervisorCell: supervisor?.supervisorCell || "",
		},
	});

	const handleCancel = () => {
		form.reset();
	};

	const onSubmit = async (data: SupervisorFormData) => {
		try {
			console.log(data, "passed data");
			if (supervisor) {
				await updateSupervisor(supervisor._id, data);
			} else {
				await createSupervisor(data);

				// reset form only after successful create
				form.reset({
					supervisorId: "",
					supervisorDescription: "",
					supervisorGroup1: "",
					supervisorGroup2: "",
					supervisorGroup3: "",
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
						<FormItem className="max-w-[150px] px-2">
							<FormLabel>Supervisor ID</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-wrap space-x-2 bg-primary/10 p-2 rounded">
					<FormField
						control={form.control}
						name="supervisorDescription"
						render={({ field }) => (
							<FormItem className="grow">
								<FormLabel>Supervisor Description</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="supervisorGroup1"
						render={({ field }) => (
							<FormItem className="max-w-[100px]">
								<FormLabel>Group 1</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="supervisorGroup2"
						render={({ field }) => (
							<FormItem className="max-w-[100px]">
								<FormLabel>Group 2</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="supervisorGroup3"
						render={({ field }) => (
							<FormItem className="max-w-[100px]">
								<FormLabel>Group 3</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="px-2">
					<FormField
						control={form.control}
						name="supervisorName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>POC Name</FormLabel>
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
								<FormLabel>POC Email</FormLabel>
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
								<FormLabel>POC Cell</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex px-2">
					<Button type="submit" className="grow">
						{supervisor ? "Update" : "Create"}
					</Button>
					<Button variant="outline" className="mx-2" onClick={handleCancel}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
}
