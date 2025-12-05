// components/CustomerJobsForm.tsx
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
	customerJobsSchema,
	CustomerJobsFormData,
} from "@/lib/schemas/customerJobs";
import { useCustomerJobs } from "@/contexts/CustomerJobsContext";
import { TCustomerJobs, TJobList } from "@/types/customerJobs";

interface CustomerJobsFormProps {
	customerJobs?: TCustomerJobs;
	custNum?: string;
	custId?: string;
	onSuccess?: () => void;
}

export default function CustomerJobsForm({
	custId,
	custNum,
	customerJobs,
	onSuccess,
}: CustomerJobsFormProps) {
	const { createCustomerJob, updateCustomerJob } = useCustomerJobs();

	console.log("CustomerJobsForm props:", { custId, custNum, customerJobs });

	const form = useForm<CustomerJobsFormData>({
		resolver: zodResolver(customerJobsSchema),
		defaultValues: {
			customerId: customerJobs?.customerId || custId,
			customerNumber: customerJobs?.customerNumber || custNum,
			customerJobsList:
				customerJobs?.customerJobsList?.map((cj) => ({
					jobId: cj.jobId,
					jobNumber: cj.jobNumber,
				})) || [],
		},
	});

	const onSubmit = async (data: CustomerJobsFormData) => {
		try {
			if (customerJobs) {
				const cleanedData = {
					...data,
					customerJobsList: data.customerJobsList?.filter(
						(job) => job.jobId !== undefined && job.jobNumber !== undefined
					) as TJobList[] | undefined,
				};
				await updateCustomerJob(customerJobs._id, cleanedData);
			} else {
				await createCustomerJob(data);
				// only reset after successful create
				form.reset({
					customerId: custId || "",
					customerNumber: custNum || "",
					customerJobsList: [],
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("CustomerJobs submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="customerId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Customer Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="customerNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Customer Number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="customerJobsList"
					render={() => {
						const jobsList = form.watch("customerJobsList") || [];
						return (
							<div className="space-y-2">
								{jobsList.map((job, index) => (
									<div key={index} className="space-y-2 border p-2 rounded">
										<FormField
											control={form.control}
											name={`customerJobsList.${index}.jobId`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Job ID</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="number"
															value={field.value ?? ""}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`customerJobsList.${index}.jobNumber`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Job Number</FormLabel>
													<FormControl>
														<Input {...field} value={field.value ?? ""} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								))}
							</div>
						);
					}}
				/>{" "}
				<div>
					<Button className="mb-4" type="submit">
						{customerJobs ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
