// components/Tier7Form.tsx
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
import { tier7Schema, Tier7FormData } from "@/lib/schemas/tiers/tier7Schema";
import { useTier7 } from "@/contexts/tiers/Tier7Context";
import { TTier7 } from "@/types/tiers";

interface Tier7FormProps {
	tier7?: TTier7;
	onSuccess?: () => void;
}

export default function Tier7Form({ tier7, onSuccess }: Tier7FormProps) {
	const { createTier7, updateTier7 } = useTier7();

	const form = useForm<Tier7FormData>({
		resolver: zodResolver(tier7Schema),
		defaultValues: {
			tierValue: tier7?.tierValue || "",
			tierValueDescription: tier7?.tierValueDescription || "",
		},
	});

	const onSubmit = async (data: Tier7FormData) => {
		try {
			if (tier7) {
				await updateTier7(tier7._id, data);
			} else {
				await createTier7(data);
				// only reset after successful create
				form.reset({
					tierValue: "",
					tierValueDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Tier7 submit failed", err);
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
							<FormLabel>Tier7 Option Number</FormLabel>
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
						{tier7 ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
