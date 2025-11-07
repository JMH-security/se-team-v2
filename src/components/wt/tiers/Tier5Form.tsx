// components/Tier5Form.tsx
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
import { tier5Schema, Tier5FormData } from "@/lib/schemas/tiers/tier5Schema";
import { useTier5 } from "@/contexts/tiers/Tier5Context";
import { TTier5 } from "@/types/tiers";

interface Tier5FormProps {
	tier5?: TTier5;
	onSuccess?: () => void;
}

export default function Tier5Form({ tier5, onSuccess }: Tier5FormProps) {
	const { createTier5, updateTier5 } = useTier5();

	const form = useForm<Tier5FormData>({
		resolver: zodResolver(tier5Schema),
		defaultValues: {
			tierValue: tier5?.tierValue || "",
			tierValueDescription: tier5?.tierValueDescription || "",
		},
	});

	const onSubmit = async (data: Tier5FormData) => {
		try {
			if (tier5) {
				await updateTier5(tier5._id, data);
			} else {
				await createTier5(data);
				// only reset after successful create
				form.reset({
					tierValue: "",
					tierValueDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Tier5 submit failed", err);
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
							<FormLabel>Tier5 Option Number</FormLabel>
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
						{tier5 ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
