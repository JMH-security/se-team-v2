// components/Tier1Form.tsx
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
import { tier1Schema, Tier1FormData } from "@/lib/schemas/tiers/tier1Schema";
import { useTier1 } from "@/contexts/tiers/Tier1Context";
import { TTier1 } from "@/types/tiers";

interface Tier1FormProps {
	tier1?: TTier1;
	onSuccess?: () => void;
}

export default function Tier1Form({ tier1, onSuccess }: Tier1FormProps) {
	const { createTier1, updateTier1 } = useTier1();

	const form = useForm<Tier1FormData>({
		resolver: zodResolver(tier1Schema),
		defaultValues: {
			tierValue: tier1?.tierValue || "",
			tierValueDescription: tier1?.tierValueDescription || "",
		},
	});

	const onSubmit = async (data: Tier1FormData) => {
		try {
			if (tier1) {
				await updateTier1(tier1._id, data);
			} else {
				await createTier1(data);
				// only reset after successful create
				form.reset({
					tierValue: "",
					tierValueDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Tier1 submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="tierValue"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tier1 Option Number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tierValueDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Option Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button className="mb-4" type="submit">
						{tier1 ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
