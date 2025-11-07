// components/Tier4Form.tsx
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
import { tier4Schema, Tier4FormData } from "@/lib/schemas/tiers/tier4Schema";
import { useTier4 } from "@/contexts/tiers/Tier4Context";
import { TTier4 } from "@/types/tiers";

interface Tier4FormProps {
	tier4?: TTier4;
	onSuccess?: () => void;
}

export default function Tier4Form({ tier4, onSuccess }: Tier4FormProps) {
	const { createTier4, updateTier4 } = useTier4();

	const form = useForm<Tier4FormData>({
		resolver: zodResolver(tier4Schema),
		defaultValues: {
			tierValue: tier4?.tierValue || "",
			tierValueDescription: tier4?.tierValueDescription || "",
		},
	});

	const onSubmit = async (data: Tier4FormData) => {
		try {
			if (tier4) {
				await updateTier4(tier4._id, data);
			} else {
				await createTier4(data);
				// only reset after successful create
				form.reset({
					tierValue: "",
					tierValueDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Tier4 submit failed", err);
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
							<FormLabel>Tier4 Option Number</FormLabel>
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
						{tier4 ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
