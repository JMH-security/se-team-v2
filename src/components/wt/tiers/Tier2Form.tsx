// components/Tier2Form.tsx
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
import { tier2Schema, Tier2FormData } from "@/lib/schemas/tiers/tier2Schema";
import { useTier2 } from "@/contexts/tiers/Tier2Context";
import { TTier2 } from "@/types/tiers";

interface Tier2FormProps {
	tier2?: TTier2;
	onSuccess?: () => void;
}

export default function Tier2Form({ tier2, onSuccess }: Tier2FormProps) {
	const { createTier2, updateTier2 } = useTier2();

	const form = useForm<Tier2FormData>({
		resolver: zodResolver(tier2Schema),
		defaultValues: {
			tierValue: tier2?.tierValue || "",
			tierValueDescription: tier2?.tierValueDescription || "",
		},
	});

	const onSubmit = async (data: Tier2FormData) => {
		try {
			if (tier2) {
				await updateTier2(tier2._id, data);
			} else {
				await createTier2(data);
				// only reset after successful create
				form.reset({
					tierValue: "",
					tierValueDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Tier2 submit failed", err);
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
							<FormLabel>Tier2 Option Number</FormLabel>
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
						{tier2 ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
