// components/AddJobForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
import { Customer } from "@/types/customer";
import {
	TTier1,
	TTier2,
	TTier3,
	TTier4,
	TTier5,
	TTier6,
	TTier7,
} from "@/types/tiers";
import { useHoursRule } from "@/contexts/HoursRuleContext";
import { useHoursCategory } from "@/contexts/HoursCategoryContext";
import { useSupervisor } from "@/contexts/SupervisorContext";
import { useSalesTaxState } from "@/contexts/SalesTaxStateContext";
import { useTier1 } from "@/contexts/tiers/Tier1Context";
import { useTier2 } from "@/contexts/tiers/Tier2Context";
import { useTier3 } from "@/contexts/tiers/Tier3Context";
import { useTier4 } from "@/contexts/tiers/Tier4Context";
import { useTier5 } from "@/contexts/tiers/Tier5Context";
import { useTier6 } from "@/contexts/tiers/Tier6Context";
import { useTier7 } from "@/contexts/tiers/Tier7Context";

import { useJobPayrollTaxState } from "@/contexts/JobPayrollTaxStateContext";
import { useTaxesInsurance } from "@/contexts/TaxesInsuranceContext";

interface AddJobFormProps {
	customer?: Customer;
	addJob?: TAddJob;
	onSuccess?: () => void;
}

export default function AddJobForm({
	customer,
	addJob,
	onSuccess,
}: AddJobFormProps) {
	const router = useRouter();
	const { createAddJob, updateAddJob } = useAddJob();
	const { hoursRules } = useHoursRule();
	const { hoursCategorys } = useHoursCategory();
	const { supervisors } = useSupervisor();
	const { salesTaxStates } = useSalesTaxState();
	// jobPayrollTaxStates not used in this form currently
	const { jobPayrollTaxStates } = useJobPayrollTaxState();
	const { taxesInsurances } = useTaxesInsurance();
	const { tier1s } = useTier1();
	const { tier2s } = useTier2();
	const { tier3s } = useTier3();
	const { tier4s } = useTier4();
	const { tier5s } = useTier5();
	const { tier6s } = useTier6();
	const { tier7s } = useTier7();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const phoneChoice = [
		{ value: 1, description: "Cell Phone" },
		{ value: 2, description: "Standard Phone" },
	];

	const form = useForm<AddJobFormData>({
		resolver: zodResolver(addJobSchema),
		defaultValues: {
			_id: addJob?._id || undefined,
			jobNumber: addJob?.jobNumber || "",
			jobId: addJob?.jobId || "",
			jobDescription: addJob?.jobDescription || "",
			locationId: addJob?.locationId || undefined,
			companyNumber: addJob?.companyNumber ?? undefined,
			hoursRuleId: addJob?.hoursRuleId ?? undefined,
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
			jobPayrollTaxStateId: addJob?.jobPayrollTaxStateId ?? 1,
			hoursCategoryId: addJob?.hoursCategoryId ?? null,
			notes: addJob?.notes ?? null,
			address: addJob?.address ?? null,
			taxAddress: addJob?.taxAddress ?? null,
			jobTiers: addJob?.jobTiers ?? [],
			customFields: addJob?.customFields ?? [],
			parentJobNumber: addJob?.parentJobNumber ?? null,
		},
	});

	const onSubmit = async (data: AddJobFormData) => {
		// Set Job to Active (typeId = 1) and Company Number to 1
		data.jobTiers = data.jobTiers ?? [];
		data.typeId = 1;
		data.companyNumber = 1;
		data.taxAddress = {};

		//Add customer data into custom fields
		data.customFields = data.customFields ?? [];
		data.customFields.push({
			fieldNumber: 2,
			value: customer?.CustomerID?.toString() || "",
		});
		data.customFields.push({
			fieldNumber: 3,
			value: customer?.CustomerName || "",
		});
		data.customFields.push({
			fieldNumber: 4,
			value: customer?.CustomerNumber?.toString() || "",
		});
		data.customFields.push({
			fieldNumber: 5,
			value: data?.jobContactEmail || "",
		});

		///TIER CONSTRUCTION*********************************************
		//Tier 1
		const tier1Selected = data.tier1Value ?? "1";
		const tier1Match = tier1s.find((t) => t._id === tier1Selected);
		data.jobTiers.push({
			tierValue: tier1Match?.tierValue ?? "0",
			tierValueDescription: tier1Match?.tierValueDescription ?? "[Select One]",
		});
		//Tier 2
		const tier2Selected = data.tier2Value ?? "1";
		const tier2Match = tier2s.find((t) => t._id === tier2Selected);
		data.jobTiers.push({
			tierValue: tier2Match?.tierValue ?? "0",
			tierValueDescription: tier2Match?.tierValueDescription ?? "[Select One]",
		});

		//Tier 3
		const tier3Selected = data.tier3Value ?? "1";
		const tier3Match = tier3s.find((t) => t._id === tier3Selected);
		data.jobTiers.push({
			tierValue: tier3Match?.tierValue ?? "0",
			tierValueDescription: tier3Match?.tierValueDescription ?? "[Select One]",
		});

		//Tier 4
		const tier4Selected = data.tier4Value ?? "1";
		const tier4Match = tier4s.find((t) => t._id === tier4Selected);
		data.jobTiers.push({
			tierValue: tier4Match?.tierValue ?? "0",
			tierValueDescription: tier4Match?.tierValueDescription ?? "[Select One]",
		});

		//Tier5
		const tier5Selected = data.tier5Value ?? "1";
		const tier5Match = tier5s.find((t) => t._id === tier5Selected);
		data.jobTiers.push({
			tierValue: tier5Match?.tierValue ?? "0",
			tierValueDescription: tier5Match?.tierValueDescription ?? "[Select One]",
		});

		//Tier 6
		const tier6Selected = data.tier6Value ?? "1";
		const tier6Match = tier6s.find((t) => t._id === tier6Selected);
		data.jobTiers.push({
			tierValue: tier6Match?.tierValue ?? "0",
			tierValueDescription: tier6Match?.tierValueDescription ?? "[Select One]",
		});

		//Tier 7
		const tier7Selected = data.tier7Value ?? "1";
		const tier7Match = tier7s.find((t) => t._id === tier7Selected);
		data.jobTiers.push({
			tierValue: tier7Match?.tierValue ?? "0",
			tierValueDescription: tier7Match?.tierValueDescription ?? "[Select One]",
		});
		// remove temporary tier selection values
		delete data.tier1Value;
		delete data.tier2Value;
		delete data.tier3Value;
		delete data.tier4Value;
		delete data.tier5Value;
		delete data.tier6Value;
		delete data.tier7Value;
		//// END TIER CONSTRUCTION*********************************************

		// Set tax address to job address
		// data.taxAddress = {
		// 	address1: data.address?.jobAddress1 || null,
		// 	address2: data.address?.jobAddress2 || null,
		// 	city: data.address?.jobCity || null,
		// 	state: data.address?.jobState || null,
		// 	zip: data.address?.jobZip || null,
		// };

		data.taxAddress = {
			address1: "1617 3rd Ave N",
			address2: null,
			city: "Birmingham",
			state: "AL",
			zip: "352031901",
			latitude: "33.513791",
			longitude: "-86.811432",
			locationCode: "01-073-158174",
		};

		data.jobPayrollTaxStateId = data.salesTaxStateId;
		data.jobPayrollTaxStateId = 1;

		setIsSubmitting(true);
		try {
			if (addJob) {
				await updateAddJob(addJob._id, data);
				setSubmitSuccess(true);
				if (onSuccess) onSuccess();
			} else {
				const response = await createAddJob(data);
				if (response) {
					setSubmitSuccess(true);
					await new Promise((resolve) => setTimeout(resolve, 1500));
				}

				form.reset({
					jobNumber: "",
					jobDescription: "",
					jobAttention: "",
					companyNumber: undefined,
					hoursRuleId: undefined,
					supervisorId: null,
					taxesInsuranceId: null,
					salesTaxStateId: null,
					jobPayrollTaxStateId: null,
					hoursCategoryId: null,
					address: {
						jobAddress1: "",
						jobAddress2: "",
						jobCity: "",
						jobState: "",
						jobZip: "",
					},
					phone1: null,
					phone1Description: null,
					taxAddress: null,
					jobTiers: [],
					customFields: [],
					jobContactEmail: "",
				});
				// Navigate to the job details page with the jobId from WinTeam
				if (response?.jobId) {
					router.push(`/seteam/jobs/${response.jobId}`);
				}
			}
		} catch (err) {
			console.error("AddJob submit failed", err);
			setIsSubmitting(false);
			setSubmitSuccess(false);
		}
	};

	return (
		<div className="container p-4">
			{isSubmitting && !submitSuccess && (
				<div className="flex items-center justify-center py-8">
					<Card className="bg-accent/50">
						<CardTitle className="ml-4 text-sm">STATUS UPDATE</CardTitle>
						<CardContent className="text-2xl text-yellow-300 mr-4">
							Submitting Data to Database and WinTeam
						</CardContent>
					</Card>
				</div>
			)}

			{submitSuccess && (
				<div className="flex items-center justify-center py-8">
					<Card className="bg-accent/50">
						<CardTitle className="ml-4 text-sm">STATUS UPDATE</CardTitle>
						<CardContent className="text-2xl text-green-600 mr-4">
							Job Added to Database
						</CardContent>
					</Card>
				</div>
			)}

			{!isSubmitting && (
				<Form {...form}>
					<div className="container p-4">
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid 
        lg:grid-cols-8 
        grid-cols-4 
        gap-4 
        auto-rows-min 
        grid-auto-rows-min-content"
						>
							{/* ***********************  Basic Info Section *************************/}
							{/* ***********  JOB NUMBER FIELD HIDDEN ON ADD JOB**********************/}
							<div className="col-span-2 lg:col-span-2 hidden">
								<FormField
									control={form.control}
									name="jobNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Job Number</FormLabel>
											<FormControl>
												<Input
													value={field.value ?? ""}
													onChange={(e) => field.onChange(e.target.value)}
													onBlur={field.onBlur}
													name={field.name}
													ref={field.ref}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="col-span-2 lg:col-span-6"></div>
							<div className="col-span-full row-span-2">
								<FormField
									control={form.control}
									name="jobDescription"
									render={({ field }) => (
										<FormItem className="">
											<FormLabel className="">Job Description</FormLabel>
											<FormControl className="">
												<Textarea className="" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* ***********************  Contact Info Section *************************/}

							<div className="grid lg:grid-cols-2 grid-cols-1 col-span-full gap-4 p-2 border border-slate-600 rounded-md">
								<div className="row-start-1 flex items-center justify-center mx-auto">
									<Label className="text-lg text-secondary">
										Job Contact Info
									</Label>
								</div>
								<div className="row-start-2">
									<FormField
										control={form.control}
										name="jobAttention"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Job Primary Contact</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => field.onChange(e.target.value)}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
														placeholder="Full Name"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="row-start-2">
									<FormField
										control={form.control}
										name="jobContactEmail"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Job Contact Email</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => field.onChange(e.target.value)}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
														placeholder="Email"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="row-start-3">
									<FormField
										control={form.control}
										name="phone1"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone 1</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => {
															const value = e.target.value.replace(/\D/g, "");
															if (value.length <= 10) {
																field.onChange(value);
															}
														}}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
														placeholder="1234567890"
														maxLength={10}
														pattern="\d{10}"
														title="Please enter a 10-digit phone number"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="row-start-4 lg:row-start-3">
									<FormField
										control={form.control}
										name="phone1Description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone Type</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Phone Type" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{phoneChoice.map((p) => (
																	<SelectItem
																		key={p.value}
																		value={p.value.toString()}
																	>
																		{p.description}
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
								</div>
								<div className="row-start-4 lg:row-start-3"></div>
								<div className="row-start-5 lg:row-start-3"></div>
								<div className="row-start-6 lg:row-start-4"></div>
							</div>

							{/*********************** End contact info Section *************************/}

							<div className="grid lg:grid-cols-2 grid-cols-1 col-span-full gap-4 p-2 border border-slate-600 rounded-md">
								<div className="row-start-1 flex items-center justify-center mx-auto">
									<Label className="text-lg text-secondary">
										Job Service Address
									</Label>
								</div>

								<div className="row-start-2">
									<FormField
										control={form.control}
										name="address.jobAddress1"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Street Address</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => field.onChange(e.target.value)}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="row-start-3 lg:row-start-2">
									<FormField
										control={form.control}
										name="address.jobAddress2"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address Line 2</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => field.onChange(e.target.value)}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="row-start-4 lg:row-start-3">
									<FormField
										control={form.control}
										name="address.jobCity"
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => field.onChange(e.target.value)}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="row-start-5 lg:row-start-3">
									<FormField
										control={form.control}
										name="address.jobState"
										render={({ field }) => (
											<FormItem>
												<FormLabel>State</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => field.onChange(e.target.value)}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="row-start-6 lg:row-start-4">
									<FormField
										control={form.control}
										name="address.jobZip"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Zip Code</FormLabel>
												<FormControl>
													<Input
														value={field.value ?? ""}
														onChange={(e) => field.onChange(e.target.value)}
														onBlur={field.onBlur}
														name={field.name}
														ref={field.ref}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							{/***********************  Selector Section *************************/}
							<div className="grid lg:grid-cols-2 grid-cols-1 col-span-full gap-4 p-2 border border-slate-600 rounded-md">
								<div className="row-start-1 flex items-center justify-center mx-auto">
									<Label className="text-lg text-secondary">
										SELECT OPTIONS
									</Label>
								</div>

								<div className="row-start-2">
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
														onValueChange={(v) =>
															field.onChange(v ? Number(v) : null)
														}
													>
														<SelectTrigger className="w-full">
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
								</div>
								<div className="row-start-3 lg:row-start-2">
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
														onValueChange={(v) =>
															field.onChange(v ? Number(v) : null)
														}
													>
														<SelectTrigger className="w-full">
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
								</div>

								<div className="row-start-4 lg:row-start-3">
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
														onValueChange={(v) =>
															field.onChange(v ? Number(v) : null)
														}
													>
														<SelectTrigger className="w-full">
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
								</div>
								{/***********************  Sales Tax State ID Field *************************/}
								<div className="lg:row-start-3 row-start-5">
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
														onValueChange={(v) =>
															field.onChange(v ? Number(v) : null)
														}
													>
														<SelectTrigger className="w-full">
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
								</div>

								<div className="row-start-6 lg:row-start-4 col-start-1">
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
														onValueChange={(v) =>
															field.onChange(v ? Number(v) : null)
														}
													>
														<SelectTrigger className="w-full">
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
								</div>

								<div className="row-start-7 lg:row-start-4 lg:col-start-2">
									<FormField
										control={form.control}
										name="jobPayrollTaxStateId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Payroll Tax State</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) =>
															field.onChange(v ? Number(v) : null)
														}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Payroll Tax State" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{jobPayrollTaxStates.map((s) => (
																	<SelectItem
																		key={s._id}
																		value={s.jobPayrollTaxStateId.toString()}
																	>
																		{s.jobPayrollTaxStateName}
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
								</div>
							</div>

							{/***********************  TIER Selector Section *************************/}
							<div className="grid lg:grid-cols-2 grid-cols-1 col-span-full gap-4 p-2 border border-slate-600 rounded-md">
								<div className="row-start-1 flex items-center justify-center mx-auto">
									<Label className="text-lg text-secondary">SELECT TIERS</Label>
								</div>

								<div className="row-start-2">
									<FormField
										control={form.control}
										name="tier1Value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Customer Industry Type</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v ? v : null)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Customer Industry Type" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{tier1s.map((t1: TTier1) => (
																	<SelectItem key={t1._id} value={t1._id}>
																		{t1.tierValue} - {t1.tierValueDescription}
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
								</div>
								<div className="row-start-3 lg:row-start-2">
									<FormField
										control={form.control}
										name="tier2Value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Type of Service</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v ? v : null)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Type of Service" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{tier2s.map((t2: TTier2) => (
																	<SelectItem key={t2._id} value={t2._id}>
																		{t2.tierValue} - {t2.tierValueDescription}
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
								</div>
								<div className="row-start-4 lg:row-start-3 col-start-1">
									<FormField
										control={form.control}
										name="tier3Value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Uniform Force Specification</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v ? v : null)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Uniform Force Specification" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{tier3s.map((t3: TTier3) => (
																	<SelectItem key={t3._id} value={t3._id}>
																		{t3.tierValue} - {t3.tierValueDescription}
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
								</div>
								<div className="row-start-5 lg:row-start-3">
									<FormField
										control={form.control}
										name="tier4Value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Service Frequency</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v ? v : null)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Service Frequency" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{tier4s.map((t4: TTier4) => (
																	<SelectItem key={t4._id} value={t4._id}>
																		{t4.tierValue} - {t4.tierValueDescription}
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
								</div>

								<div className="lg:row-start-4 row-start-6">
									<FormField
										control={form.control}
										name="tier5Value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Region</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v ? v : null)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Region" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{tier5s.map((t5: TTier5) => (
																	<SelectItem key={t5._id} value={t5._id}>
																		{t5.tierValue} - {t5.tierValueDescription}
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
								</div>
								<div className="lg:row-start-4 row-start-7">
									<FormField
										control={form.control}
										name="tier6Value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Branch</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v ? v : null)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Branch" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{tier6s.map((t6: TTier6) => (
																	<SelectItem key={t6._id} value={t6._id}>
																		{t6.tierValue} - {t6.tierValueDescription}
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
								</div>

								<div
									className={`lg:row-start-5 row-start-8 ${
										form.watch("tier6Value") === "69176831ac9c8828949e09e4"
											? ""
											: "hidden"
									}`}
								>
									<FormField
										control={form.control}
										name="tier7Value"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Zone</FormLabel>
												<FormControl>
													<Select
														value={
															field.value !== null && field.value !== undefined
																? String(field.value)
																: ""
														}
														onValueChange={(v) => field.onChange(v ? v : null)}
													>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Tier7" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																{tier7s.map((t7: TTier7) => (
																	<SelectItem key={t7._id} value={t7._id}>
																		{t7.tierValue} - {t7.tierValueDescription}
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
								</div>
							</div>

							<div className="">
								<Button className="mb-4" type="submit">
									{addJob ? "Update Job" : "Create New Job"}
								</Button>
							</div>
						</form>
					</div>
				</Form>
			)}
		</div>
	);
}
