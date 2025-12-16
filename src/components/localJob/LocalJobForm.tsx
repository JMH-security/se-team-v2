// components/RegionForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { localJobSchema, LocalJobFormData } from "@/lib/schemas/localJobSchema";
import { useLocalJob } from "@/contexts/localJobContext";
import { TLocalJob } from "@/types/localJob";
import { Customer } from "@/types/customer";

interface LocalJobFormProps {
	customer?: Customer;
	localJob?: TLocalJob;
	onSuccess?: () => void;
}

export default function LocalJobForm({
	customer,
	localJob,
	onSuccess,
}: LocalJobFormProps) {
	const router = useRouter();
	const { createLocalJob, updateLocalJob } = useLocalJob();
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
			supervisorId: localJob?.supervisorId || 1,
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
			tier1Value: localJob?.tier1Value || "1",
			tier2Value: localJob?.tier2Value || "1",
			tier3Value: localJob?.tier3Value || "1",
			tier4Value: localJob?.tier4Value || "1",
			tier5Value: localJob?.tier5Value || "1",
			tier6Value: localJob?.tier6Value || "1",
			tier7Value: localJob?.tier7Value || "1",
			customFields: localJob?.customFields ?? [],
			posts:
				localJob?.posts?.map((p) => ({
					postId: p.postId?.toString(),
					postName: p.postName,
					postHPW: p.postHPW,
					postBillRate: p.postBillRate,
					postWageRate: p.postWageRate,
				})) ?? [],
			hpw: localJob?.hpw || 0,
		},
	});

	const onSubmit = async (data: LocalJobFormData) => {
		try {
			if (localJob) {
				await updateLocalJob(localJob._id, data);
			} else {
				await createLocalJob(data);
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
					tier1Value: "1",
					tier2Value: "1",
					tier3Value: "1",
					tier4Value: "1",
					tier5Value: "1",
					tier6Value: "1",
					tier7Value: "1",
					customFields: [],
					posts: [],
					hpw: 0,
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

				<div>
					<Button className="mb-4" type="submit">
						{localJob ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
