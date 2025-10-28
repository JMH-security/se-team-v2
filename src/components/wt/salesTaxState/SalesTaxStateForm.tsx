// components/SalesTaxStateForm.tsx
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
	salesTaxStateSchema,
	SalesTaxStateFormData,
} from "@/lib/schemas/salesTaxStateSchema";
import { useSalesTaxState } from "@/contexts/SalesTaxStateContext";
import { TSalesTaxState } from "@/types/salestaxstate";

interface SalesTaxStateFormProps {
	salesTaxState?: TSalesTaxState;
	onSuccess?: () => void;
}

export default function SalesTaxStateForm({
	salesTaxState,
	onSuccess,
}: SalesTaxStateFormProps) {
	const { createSalesTaxState, updateSalesTaxState } = useSalesTaxState();

	const form = useForm<SalesTaxStateFormData>({
		resolver: zodResolver(salesTaxStateSchema),
		defaultValues: {
			salesTaxStateId: salesTaxState?.salesTaxStateId || "",
			salesTaxStateName: salesTaxState?.salesTaxStateName || "",
		},
	});

	const onSubmit = async (data: SalesTaxStateFormData) => {
		try {
			if (salesTaxState) {
				await updateSalesTaxState(salesTaxState._id, data);
			} else {
				console.log("creating sales tax state with data:", data);
				await createSalesTaxState(data);
				// only reset after successful create
				form.reset({
					salesTaxStateId: "",
					salesTaxStateName: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("SalesTaxState submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="salesTaxStateId"
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
					name="salesTaxStateName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sales Tax State</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button className="mb-4" type="submit">
						{salesTaxState ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
