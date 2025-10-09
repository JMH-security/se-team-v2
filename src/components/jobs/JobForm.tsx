"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Customer } from "@/types/customer";
import { jobFormSchema } from "@/lib/formSchemas/jobSchema";

interface JobFormProps {
	customer: Customer;
}

// Define TypeScript type for form data
type FormData = z.infer<typeof jobFormSchema>;

export default function JobForm({ customer }: JobFormProps) {
	console.log("JobForm customer:", customer);

	// Initialize the form with react-hook-form and Zod resolver
	const form = useForm<FormData>({
		resolver: zodResolver(jobFormSchema),
		defaultValues: {
			// jobId: "",
			// companyNumber: 1,
			// hoursRuleId: 1,
			jobNumber: "",
			jobDescription: "",
			// locationId: 1,
			address: {
				address1: "",
				// 	address2: "",
				city: "",
				state: "",
				zip: "",
			},
			// taxAddress: {
			// 	address1: "",
			// 	address2: "",
			// 	city: "",
			// 	state: "",
			// 	zip: "",
			// },
			jobAttention: "",
			// typeId: 1,
			// supervisorId: 1,
			// salesTaxStateId: 1,
			// jobPayrollTaxStateId: 1,
			// hoursCategoryId: 1,
			// jobTier: [],
			// taxesInsuranceId: 1,
			// customFields: [],
			// isAvalaraClient: false,
			// customerId: "",
			// regionId: "",
			// branchId: 1,
			// timeKeepingJob: false,
			// timeSheetTypeId: 1,
		},
	});
	console.log("FORM INIT", form);

	// Handle form submission
	const onSubmit = async (data: FormData) => {
		console.log("Form submitted:", data);
		data.branchId = 1;
		data.regionId = "1";
		data.hoursCategoryId = 1;
		data.companyNumber = 1;
		data.customerId = customer.CustomerID as string;
		data.isAvalaraClient = false;
		data.supervisorId = 1;
		data.typeId = 1;
		data.taxesInsuranceId = 1;
		data.salesTaxStateId = 1;
		data.jobPayrollTaxStateId = 1;
		data.locationId = 1;
		data.hoursRuleId = 1;
		data.taxAddress = {
			address1: "123 Main St",
			address2: "line 2",
			city: "Birmingham",
			state: "AL",
			zip: "35203",
		};

		// Add your form submission logic here

		//****************** ADD VALIDATED DATA TO WINTEAM JOB - INCLUDE CUSTOMER ID  *********************************/

		//****************** ADD JOBID TO CUSTOMER RECORD IN WINTEAM **************************************************/

		// ADD CUSTOMER

		try {
			console.log("Lets call the jobs wt api");
			const res = await fetch("/api/jobs/wt", {
				method: "POST",
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				throw new Error(`Error: ${res.status} ${res.statusText}`);
			} else {
				console.log("Form submission successful");
			}
		} catch (error) {
			console.error("Error:", error);
			throw error; // This will trigger Next.js error boundary
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 max-w-lg mx-auto p-6 text-black bg-white shadow-md rounded-lg"
			>
				<FormField
					control={form.control}
					name="jobNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium text-gray-700">
								Job Number
							</FormLabel>
							<FormControl>
								<Input
									{...form.register("jobNumber")}
									placeholder="Enter job number"
									className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500 text-sm mt-1" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="jobDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium text-gray-700">
								Job Name
							</FormLabel>
							<FormControl>
								<Input
									{...form.register("jobDescription")}
									placeholder="Enter job description"
									className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500 text-sm mt-1" />
						</FormItem>
					)}
				/>

				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-gray-900">Job Address</h3>

					<FormField
						control={form.control}
						name="address.address1"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									Street
								</FormLabel>
								<FormControl>
									<Input
										{...form.register("address.address1")}
										placeholder="Enter street address"
										className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm mt-1" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address.city"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									City
								</FormLabel>
								<FormControl>
									<Input
										{...form.register("address.city")}
										placeholder="Enter city"
										className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm mt-1" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address.state"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									State
								</FormLabel>
								<FormControl>
									<Input
										{...form.register("address.state")}
										placeholder="Enter state"
										className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm mt-1" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address.zip"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									Zip Code
								</FormLabel>
								<FormControl>
									<Input
										{...form.register("address.zip")}
										placeholder="Enter zip code"
										className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500 text-sm mt-1" />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="jobAttention"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium text-gray-700">
								Job Description
							</FormLabel>
							<FormControl>
								<Textarea
									{...form.register("jobAttention")}
									placeholder="Enter job Attention"
									className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
									rows={4}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500 text-sm mt-1" />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
