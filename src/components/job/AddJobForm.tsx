// components/AddJobForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { addJobSchema, AddJobFormData } from "@/lib/schemas/addJobSchema";
import { useAddJob } from "@/contexts/AddJobContext";
import { TAddJob } from "@/types/addJob";
import { useHoursRule } from "@/contexts/HoursRuleContext";
import { useHoursCategory } from "@/contexts/HoursCategoryContext";
import { useSupervisor } from "@/contexts/SupervisorContext";
import { useSalesTaxState } from "@/contexts/SalesTaxStateContext";
import { useJobPayrollTaxState } from "@/contexts/JobPayrollTaxStateContext";
import { useTaxesInsurance } from "@/contexts/TaxesInsuranceContext";

interface AddJobFormProps {
	customer?: string;
	addJob?: TAddJob;
	onSuccess?: () => void;
}

export default function AddJobForm({
	customer,
	addJob,
	onSuccess,
}: AddJobFormProps) {
	const params = useParams();
	const routeCustomerId = params?.customerNumber ?? undefined;
	const { createAddJob, updateAddJob } = useAddJob();
	const { hoursRules } = useHoursRule();
	const { hoursCategorys } = useHoursCategory();
	const { supervisors } = useSupervisor();
	const { salesTaxStates } = useSalesTaxState();
	const { jobPayrollTaxStates } = useJobPayrollTaxState();
	const { taxesInsurances } = useTaxesInsurance();

	const form = useForm<AddJobFormData>({
		resolver: zodResolver(addJobSchema),
		defaultValues: {
			_id: addJob?._id || undefined,
			jobNumber: addJob?.jobNumber || "",
			jobId: addJob?.jobId || "",
			jobDescription: addJob?.jobDescription || "",
			locationId: addJob?.locationId || undefined,
			companyNumber: addJob?.companyNumber ?? undefined,
			hoursRuleId: addJob?.hoursRuleId ?? null,
			jobAttention: addJob?.jobAttention ?? null,
			dateToStart: addJob?.dateToStart ?? null,
			typeId: addJob?.typeId ?? null,
			phone1: addJob?.phone1 ?? null,
			phone1Description: addJob?.phone1Description ?? null,
			phone2: addJob?.phone2 ?? null,
			phone2Description: addJob?.phone2Description ?? null,
			phone3: addJob?.phone3 ?? null,
			phone3Description: addJob?.phone3Description ?? null,
			supervisorId: addJob?.supervisorId ?? null,
			taxesInsuranceId: addJob?.taxesInsuranceId ?? null,
			salesTaxStateId: addJob?.salesTaxStateId ?? null,
			jobPayrollTaxStateID: addJob?.jobPayrollTaxStateID ?? null,
			hoursCategoryID: addJob?.hoursCategoryID ?? null,
			notes: addJob?.notes ?? null,
			address: addJob?.address ?? null,
			taxAddress: addJob?.taxAddress ?? null,
			jobTiers: addJob?.jobTiers ?? [],
			customFields: addJob?.customFields ?? [],
			parentJobNumber: addJob?.parentJobNumber ?? null,
		},
	});

	const onSubmit = async (data: AddJobFormData) => {
		data.typeId = 1;
		data.companyNumber = 1;
		data.customFields.push({ fieldNumber: 2, value: routeCustomerId });
		data.address = {
			jobaddress1: "123 Main st",
			jobaddress2: "",
			city: "Anytown",
			state: "CA",
			zip: "12345",
		};
		data.taxAddress = {
			taxAddress1: "123 Main st",
			taxAddress2: "",
			city: "Anytown",
			state: "CA",
			zip: "12345",
		};
		try {
			if (addJob) {
				await updateAddJob(addJob._id, data);
			} else {
				await createAddJob(data);
				form.reset({
					jobNumber: "",
					jobDescription: "",
					jobAttention: "",
					companyNumber: undefined,
					hoursRuleId: null,
					supervisorId: null,
					taxesInsuranceId: null,
					salesTaxStateId: null,
					jobPayrollTaxStateID: null,
					hoursCategoryID: null,
					address: null,
					taxAddress: null,
					jobTiers: [],
					customFields: [{ fieldNumber: 1, value: customer || "" }],
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			console.error("AddJob submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="jobNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="jobDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="jobAttention"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Attention</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/**************************** HARD CODING COMPANY NUMBER TO 1 *******************************/}
				{/* <FormField
					control={form.control}
					name="companyNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Number</FormLabel>
							<FormControl>
								<Input
									type="number"
									value={field.value ?? ""}
									onChange={(e) =>
										field.onChange(
											e.target.value ? Number(e.target.value) : undefined
										)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}
				{/**************************** HARD CODED COMPANY NUMBER TO 1 *******************************/}

				<FormField
					control={form.control}
					name="hoursRuleId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hours Rule</FormLabel>
							<FormControl>
								<Select
									value={
										field.value !== null && field.value !== undefined
											? String(field.value)
											: ""
									}
									onValueChange={(v) => field.onChange(v ? Number(v) : null)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Hours Rule" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{hoursRules.map((r) => (
												<SelectItem
													key={r._id}
													value={r.hoursRuleId.toString()}
												>
													{r.hoursRuleName}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="supervisorId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Supervisor</FormLabel>
							<FormControl>
								<Select
									value={
										field.value !== null && field.value !== undefined
											? String(field.value)
											: ""
									}
									onValueChange={(v) => field.onChange(v ? Number(v) : null)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Supervisor" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{supervisors.map((s) => (
												<SelectItem
													key={s._id}
													value={s.supervisorId.toString()}
												>
													{s.supervisorName}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="taxesInsuranceId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Taxes / Insurance</FormLabel>
							<FormControl>
								<Select
									value={
										field.value !== null && field.value !== undefined
											? String(field.value)
											: ""
									}
									onValueChange={(v) => field.onChange(v ? Number(v) : null)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Taxes/Insurance" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{taxesInsurances.map((t) => (
												<SelectItem
													key={t._id}
													value={t.taxesInsuranceId.toString()}
												>
													{t.taxesInsuranceName}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/***********************  Sales Tax State ID Field *************************/}

				<FormField
					control={form.control}
					name="salesTaxStateId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sales Tax State</FormLabel>
							<FormControl>
								<Select
									value={
										field.value !== null && field.value !== undefined
											? String(field.value)
											: ""
									}
									onValueChange={(v) => field.onChange(v ? Number(v) : null)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Sales Tax State" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{salesTaxStates.map((s) => (
												<SelectItem
													key={s._id}
													value={s.salesTaxStateId.toString()}
												>
													{s.salesTaxStateName}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/***********************  END OF Sales Tax State ID Field *************************/}

				{/***********************  Hours Category Field *************************/}

				<FormField
					control={form.control}
					name="hoursCategoryId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hours Category</FormLabel>
							<FormControl>
								<Select
									value={
										field.value !== null && field.value !== undefined
											? String(field.value)
											: ""
									}
									onValueChange={(v) => field.onChange(v ? Number(v) : null)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Hours Category" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{hoursCategorys.map((h) => (
												<SelectItem
													key={h._id}
													value={h.hoursCategoryId.toString()}
												>
													{h.hoursCategoryName}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/***********************  END OF Sales Tax State ID Field *************************/}

				<div>
					<Button className="mb-4" type="submit">
						{addJob ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
