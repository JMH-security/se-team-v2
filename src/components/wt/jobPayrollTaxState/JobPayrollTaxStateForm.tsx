// components/JobPayrollTaxStateForm.tsx
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
	jobPayrollTaxStateSchema,
	JobPayrollTaxStateFormData,
} from "@/lib/schemas/jobPayrollTaxState";
import { useJobPayrollTaxState } from "@/contexts/JobPayrollTaxStateContext";
import { TJobPayrollTaxState } from "@/types/jobPayrollTaxState";

interface JobPayrollTaxStateFormProps {
	jobPayrollTaxState?: TJobPayrollTaxState;
	onSuccess?: () => void;
}

export default function JobPayrollTaxStateForm({
	jobPayrollTaxState,
	onSuccess,
}: JobPayrollTaxStateFormProps) {
	const { createJobPayrollTaxState, updateJobPayrollTaxState } =
		useJobPayrollTaxState();

	const form = useForm<JobPayrollTaxStateFormData>({
		resolver: zodResolver(jobPayrollTaxStateSchema),
		defaultValues: {
			jobPayrollTaxStateId: jobPayrollTaxState?.jobPayrollTaxStateId || "",
			jobPayrollTaxStateName: jobPayrollTaxState?.jobPayrollTaxStateName || "",
		},
	});

	const onSubmit = async (data: JobPayrollTaxStateFormData) => {
		try {
			if (jobPayrollTaxState) {
				await updateJobPayrollTaxState(jobPayrollTaxState._id, data);
			} else {
				await createJobPayrollTaxState(data);
				// only reset after successful create
				form.reset({
					jobPayrollTaxStateId: "",
					jobPayrollTaxStateName: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("JobPayrollTaxState submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="jobPayrollTaxStateId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ID</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jobPayrollTaxStateName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button className="mb-4" type="submit">
						{jobPayrollTaxState ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
