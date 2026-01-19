// components/LocalJobForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

//types & schema
import { TLocalJob } from "@/types/localJob";
import { Customer } from "@/types/customer";
import { localJobSchema, LocalJobFormData } from "@/lib/schemas/localJobSchema";
import { TTier1 } from "@/types/tiers";
//Contexts
import { useLocalJob } from "@/contexts/localJobContext";
import { useTier1 } from "@/contexts/tiers/Tier1Context";
import { useTier2 } from "@/contexts/tiers/Tier2Context";
import { useTier3 } from "@/contexts/tiers/Tier3Context";
import { useTier4 } from "@/contexts/tiers/Tier4Context";
import { useTier5 } from "@/contexts/tiers/Tier5Context";
import { useTier6 } from "@/contexts/tiers/Tier6Context";
import { useTier7 } from "@/contexts/tiers/Tier7Context";
import { useHoursRule } from "@/contexts/HoursRuleContext";
import { useHoursCategory } from "@/contexts/HoursCategoryContext";
import { useSupervisor } from "@/contexts/SupervisorContext";
import { useSalesTaxState } from "@/contexts/SalesTaxStateContext";
import { useJobPayrollTaxState } from "@/contexts/JobPayrollTaxStateContext";
import { useTaxesInsurance } from "@/contexts/TaxesInsuranceContext";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Calendar22 } from "../resusable/Calendar";

interface LocalJobFormProps {
	customer?: Customer;
	localJob?: TLocalJob;
	onSuccess?: () => void;
}

export default function LocalJobForm({
	localJob,
	onSuccess,
}: LocalJobFormProps) {
	const { createLocalJob, updateLocalJob } = useLocalJob();
	const { tier1s } = useTier1();
	const { tier2s } = useTier2();
	const { tier3s } = useTier3();
	const { tier4s } = useTier4();
	const { tier5s } = useTier5();
	const { tier6s } = useTier6();
	const { tier7s } = useTier7();
	const { hoursRules } = useHoursRule();
	const { hoursCategorys } = useHoursCategory();
	const { supervisors } = useSupervisor();
	const { salesTaxStates } = useSalesTaxState();
	const { jobPayrollTaxStates } = useJobPayrollTaxState();
	const { taxesInsurances } = useTaxesInsurance();
	const phoneChoice = [
		{ value: 1, description: "Cell Phone" },
		{ value: 2, description: "Standard Phone" },
	];
	const params = useParams();

	const form = useForm<LocalJobFormData>({
		resolver: zodResolver(localJobSchema),
		mode: "onBlur",
		defaultValues: {
			_id: localJob?._id || "",
			jobNumber: localJob?.jobNumber || "",
			jobId: localJob?.jobId || "",
			jobDescription: localJob?.jobDescription || "",
			customerNumber: localJob?.customerNumber || "",
			customerId: (params.customerNumber as string) || "",
			locationId: localJob?.locationId || 0,
			hoursRuleId: localJob?.hoursRuleId || 1,
			hoursCategoryId: localJob?.hoursCategoryId || 1,
			taxesInsuranceId: localJob?.taxesInsuranceId || 1,
			salesTaxStateId: localJob?.salesTaxStateId || 1,
			jobPayrollTaxStateId: localJob?.jobPayrollTaxStateId || 1,
			supervisorId: localJob?.supervisorId || 1,
			jobAttention: localJob?.jobAttention || "",
			dateToStart: localJob?.dateToStart
				? new Date(localJob.dateToStart)
				: new Date(Date.now() + 86400000),
			typeId: localJob?.typeId || 1,
			phone1: localJob?.phone1 || "",
			phone1Description: localJob?.phone1Description || null,
			phone2: localJob?.phone2 || "",
			phone2Description: localJob?.phone2Description || null,
			phone3: localJob?.phone3 || "",
			phone3Description: localJob?.phone3Description || null,
			notes: localJob?.notes || "",
			address: localJob?.address || null,
			taxAddress: localJob?.taxAddress || null,
			jobTiers: localJob?.jobTiers ?? [],
			customFields: localJob?.customFields ?? [],
			posts:
				localJob?.posts?.map((p) => ({
					postId: p.postId?.toString(),
					postName: p.postName,
					postHpw: p.postHpw,
					postBillRate: p.postBillRate,
					postWageRate: p.postWageRate,
				})) ?? [],
			totalHpw: localJob?.totalHpw || 0,
			tier1Value: localJob?.tier1Value || "",
			tier2Value: localJob?.tier2Value || "",
			tier3Value: localJob?.tier3Value || "",
			tier4Value: localJob?.tier4Value || "",
			tier5Value: localJob?.tier5Value || "",
			tier6Value: localJob?.tier6Value || "",
			tier7Value: localJob?.tier7Value || "",
		},
	});

	const onSubmit = async (data: LocalJobFormData) => {
		console.log("LocalJobForm onSubmit data:", data);
		data.posts = [];
		data.taxAddress = {};
		data.customFields = data.customFields ?? [];
		data.customFields.push({
			fieldNumber: 2,
			value: params.customerNumber as string,
		});
		data.totalHpw.toString();
		if (!data.customerNumber || data.customerNumber === "") {
			data.customerNumber = params.customerNumber as string;
		}
		if (!data.jobId || data.jobId === "") {
			data.jobId = "TEMP-JOB-ID";
		}

		try {
			// Build jobTiers array from tier selections
			const jobTiersArray = [];
			if (data.tier1Value) {
				const tier1Match = tier1s.find((t) => t._id === data.tier1Value);
				if (tier1Match) {
					jobTiersArray.push({
						tierValue: tier1Match.tierValue,
						tierValueDescription: tier1Match.tierValueDescription,
					});
				}
			}
			if (data.tier2Value) {
				const tier2Match = tier2s.find((t) => t._id === data.tier2Value);
				if (tier2Match) {
					jobTiersArray.push({
						tierValue: tier2Match.tierValue,
						tierValueDescription: tier2Match.tierValueDescription,
					});
				}
			}
			if (data.tier3Value) {
				const tier3Match = tier3s.find((t) => t._id === data.tier3Value);
				if (tier3Match) {
					jobTiersArray.push({
						tierValue: tier3Match.tierValue,
						tierValueDescription: tier3Match.tierValueDescription,
					});
				}
			}
			if (data.tier4Value) {
				const tier4Match = tier4s.find((t) => t._id === data.tier4Value);
				if (tier4Match) {
					jobTiersArray.push({
						tierValue: tier4Match.tierValue,
						tierValueDescription: tier4Match.tierValueDescription,
					});
				}
			}
			if (data.tier5Value) {
				const tier5Match = tier5s.find((t) => t._id === data.tier5Value);
				if (tier5Match) {
					jobTiersArray.push({
						tierValue: tier5Match.tierValue,
						tierValueDescription: tier5Match.tierValueDescription,
					});
				}
			}
			if (data.tier6Value) {
				const tier6Match = tier6s.find((t) => t._id === data.tier6Value);
				if (tier6Match) {
					jobTiersArray.push({
						tierValue: tier6Match.tierValue,
						tierValueDescription: tier6Match.tierValueDescription,
					});
				}
			}
			if (data.tier7Value) {
				const tier7Match = tier7s.find((t) => t._id === data.tier7Value);
				if (tier7Match) {
					jobTiersArray.push({
						tierValue: tier7Match.tierValue,
						tierValueDescription: tier7Match.tierValueDescription,
					});
				}
			}
			console.log("Job Tiers Array:", jobTiersArray);
			data.jobTiers = jobTiersArray;

			if (localJob) {
				console.log("There is a localJob updating: ", localJob);
				await updateLocalJob(localJob._id, data);
			} else {
				await createLocalJob(data);
				// only reset after successful create
				form.reset({
					_id: "",
					jobNumber: "",
					jobId: "",
					jobDescription: "",
					customerNumber: "",
					customerId: (params.customerNumber as string) || "",
					locationId: 0,
					hoursRuleId: 1,
					hoursCategoryId: 1,
					taxesInsuranceId: 1,
					salesTaxStateId: 1,
					jobPayrollTaxStateId: 1,
					supervisorId: 1,
					jobAttention: "",
					dateToStart: new Date(Date.now() + 86400000),
					typeId: 1,
					phone1: "",
					phone1Description: null,
					phone2: "",
					phone2Description: null,
					phone3: "",
					phone3Description: null,
					notes: "",
					address: null,
					taxAddress: null,
					jobTiers: [],
					customFields: [],
					posts: [],
					totalHpw: 0,
					tier1Value: "",
					tier2Value: "",
					tier3Value: "",
					tier4Value: "",
					tier5Value: "",
					tier6Value: "",
					tier7Value: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("LocalJob submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{localJob && (
					<>
						<FormField
							control={form.control}
							name="_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Local Job Id</FormLabel>
									<FormControl>
										<Input {...field} readOnly className="bg-muted" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="jobNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Job Number</FormLabel>
									<FormControl>
										<Input
											value={field.value ?? ""}
											onBlur={field.onBlur}
											name={field.name}
											ref={field.ref}
											readOnly
											className="bg-muted"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="jobId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>WinTeam Job Id</FormLabel>
									<FormControl>
										<Input {...field} readOnly className="bg-muted" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}
				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">
						Job Details
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="totalHpw"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total HPW</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
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
									<FormLabel>SE Supervisor</FormLabel>
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
						<FormField
							control={form.control}
							name="typeId"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-8">
									<FormControl>
										<Checkbox
											checked={field.value === 1}
											onCheckedChange={(checked) =>
												field.onChange(checked ? 1 : 0)
											}
										/>
									</FormControl>
									<FormLabel>Active</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dateToStart"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date To Start</FormLabel>
									<FormControl>
										<Calendar22 value={field.value} onChange={field.onChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

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
				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job Details</FormLabel>
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
				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">Job Tiers</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
						<FormField
							control={form.control}
							name="tier2Value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service Type</FormLabel>
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
													{tier2s.map((t2: TTier1) => (
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
						<FormField
							control={form.control}
							name="tier3Value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Security Officer Type</FormLabel>
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
													{tier3s.map((t3: TTier1) => (
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
						<FormField
							control={form.control}
							name="tier4Value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service Duration</FormLabel>
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
													{tier4s.map((t4: TTier1) => (
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
												<SelectValue placeholder="Customer Industry Type" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{tier5s.map((t5: TTier1) => (
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
												<SelectValue placeholder="Customer Industry Type" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{tier6s.map((t6: TTier1) => (
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
												<SelectValue placeholder="Customer Industry Type" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{tier7s.map((t7: TTier1) => (
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
									onValueChange={(v) => field.onChange(v ? Number(v) : null)}
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

				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">
						Phone Numbers
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="phone1"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contact Phone Number</FormLabel>
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
						<FormField
							control={form.control}
							name="phone2"
							render={({ field }) => (
								<FormItem>
									<FormLabel>AP Contact Phone Number</FormLabel>
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
						<FormField
							control={form.control}
							name="phone2Description"
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
						<FormField
							control={form.control}
							name="phone3"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Other Phone</FormLabel>
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
						<FormField
							control={form.control}
							name="phone3Description"
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
				</div>

				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">
						Job Service Address
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
				</div>
				<div className="flex gap-4">
					<Button className="m-4" type="submit">
						{localJob ? "Update Job" : "Create Job"}
					</Button>
					{localJob && form.formState.isDirty && (
						<Button
							className="m-4"
							type="button"
							variant="outline"
							onClick={() => form.reset()}
						>
							Cancel
						</Button>
					)}
					{!form.formState.isDirty && (
						<Button
							className="m-4"
							type="button"
							variant="secondary"
							onClick={() => onSuccess?.()}
						>
							Close
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}
