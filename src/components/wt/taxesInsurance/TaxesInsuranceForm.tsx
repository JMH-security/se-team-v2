// components/TaxesInsuranceForm.tsx
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
	taxesInsuranceSchema,
	TaxesInsuranceFormData,
} from "@/lib/schemas/taxesInsuranceSchema";
import { useTaxesInsurance } from "@/contexts/TaxesInsuranceContext";
import { TTaxesInsurance } from "@/types/taxesInsurance";

interface TaxesInsuranceFormProps {
	taxesInsurance?: TTaxesInsurance;
	onSuccess?: () => void;
}

export default function TaxesInsuranceForm({
	taxesInsurance,
	onSuccess,
}: TaxesInsuranceFormProps) {
	const { createTaxesInsurance, updateTaxesInsurance } = useTaxesInsurance();

	const form = useForm<TaxesInsuranceFormData>({
		resolver: zodResolver(taxesInsuranceSchema),
		defaultValues: {
			taxesInsuranceId: taxesInsurance?.taxesInsuranceId || "",
			taxesInsuranceName: taxesInsurance?.taxesInsuranceName || "",
		},
	});

	const onSubmit = async (data: TaxesInsuranceFormData) => {
		try {
			if (taxesInsurance) {
				await updateTaxesInsurance(taxesInsurance._id, data);
			} else {
				await createTaxesInsurance(data);
				// only reset after successful create
				form.reset({
					taxesInsuranceId: "",
					taxesInsuranceName: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("TaxesInsurance submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="taxesInsuranceId"
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
					name="taxesInsuranceName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Taxes & Insurance Group Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button className="mb-4" type="submit">
						{taxesInsurance ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
