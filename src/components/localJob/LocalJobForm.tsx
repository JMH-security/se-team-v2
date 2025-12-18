// components/RegionForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

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

	const form = useForm<LocalJobFormData>({
		resolver: zodResolver(localJobSchema),
		defaultValues: {
			_id: localJob?._id || "",
			jobNumber: localJob?.jobNumber || "",
			jobId: localJob?.jobId || "",
			jobDescription: localJob?.jobDescription || "",
			locationId: localJob?.locationId || 0,
			hoursRuleId: localJob?.hoursRuleId || 1,
			hoursCategoryId: localJob?.hoursCategoryId || 1,
			taxesInsuranceId: localJob?.taxesInsuranceId || 1,
			salesTaxStateId: localJob?.salesTaxStateId || 1,
			jobPayrollTaxStateId: localJob?.jobPayrollTaxStateId || 1,
			supervisorId: localJob?.supervisorId || 1, //TIER 7
			jobAttention: localJob?.jobAttention || "",
			dateToStart: localJob?.dateToStart || new Date(),
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
			tier1Value: "",
		},
	});

	const onSubmit = async (data: LocalJobFormData) => {
		console.log("LocalJobForm onSubmit data:", data);
		try {
			// Build jobTiers array from tier selections
			const jobTiersArray = [];
			if (data.tier1Value) {
				const tier1Match = tier1s.find(
					(t) => t.tierId.toString() === data.tier1Value
				);
				if (tier1Match) {
					jobTiersArray.push({
						tierValue: tier1Match.tierValue.toString(),
						tierValueDescription: tier1Match.tierValueDescription,
					});
				}
			}

			// Create payload without tier1Value
			const payload = {
				...data,
				jobTiers: jobTiersArray,
			};
			const { ...payloadWithoutTier1 } = payload;
			delete payloadWithoutTier1.tier1Value;
			console.log("Job Tiers Array:", jobTiersArray);
			console.log("Payload to submit:", payloadWithoutTier1);

			if (localJob) {
				await updateLocalJob(localJob._id, payloadWithoutTier1);
			} else {
				await createLocalJob(payloadWithoutTier1);
				// only reset after successful create
				form.reset({
					_id: "",
					jobNumber: "",
					jobId: "",
					jobDescription: "",
					locationId: 0,
					hoursRuleId: 1,
					hoursCategoryId: 1,
					taxesInsuranceId: 1,
					salesTaxStateId: 1,
					jobPayrollTaxStateId: 1,
					supervisorId: 1,
					jobAttention: "",
					dateToStart: new Date(),
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
				<FormField
					control={form.control}
					name="_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Local Job Id</FormLabel>
							<FormControl>
								<Input {...field} />
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
					name="jobId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>WinTeam Job Id</FormLabel>
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

				<div>
					<Button className="mb-4" type="submit">
						{localJob ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
