// components/Tier3Form.tsx
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
import { tier3Schema, Tier3FormData } from "@/lib/schemas/tiers/tier3Schema";
import { useTier3 } from "@/contexts/tiers/Tier3Context";
import { TTier3 } from "@/types/tiers";

interface Tier3FormProps {
	tier3?: TTier3;
	onSuccess?: () => void;
}

export default function Tier3Form({ tier3, onSuccess }: Tier3FormProps) {
	const { createTier3, updateTier3 } = useTier3();

	const form = useForm<Tier3FormData>({
		resolver: zodResolver(tier3Schema),
		defaultValues: {
			tierValue: tier3?.tierValue || "",
			tierValueDescription: tier3?.tierValueDescription || "",
		},
	});

	const onSubmit = async (data: Tier3FormData) => {
		try {
			if (tier3) {
				await updateTier3(tier3._id, data);
			} else {
				await createTier3(data);
				// only reset after successful create
				form.reset({
					tierValue: "",
					tierValueDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Tier3 submit failed", err);
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
							<FormLabel>Tier3 Option Number</FormLabel>
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
						{tier3 ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
