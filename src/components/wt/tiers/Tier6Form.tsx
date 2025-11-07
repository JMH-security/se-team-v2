// components/Tier6Form.tsx
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
import { tier6Schema, Tier6FormData } from "@/lib/schemas/tiers/tier6Schema";
import { useTier6 } from "@/contexts/tiers/Tier6Context";
import { TTier6 } from "@/types/tiers";

interface Tier6FormProps {
	tier6?: TTier6;
	onSuccess?: () => void;
}

export default function Tier6Form({ tier6, onSuccess }: Tier6FormProps) {
	const { createTier6, updateTier6 } = useTier6();

	const form = useForm<Tier6FormData>({
		resolver: zodResolver(tier6Schema),
		defaultValues: {
			tierValue: tier6?.tierValue || "",
			tierValueDescription: tier6?.tierValueDescription || "",
		},
	});

	const onSubmit = async (data: Tier6FormData) => {
		try {
			if (tier6) {
				await updateTier6(tier6._id, data);
			} else {
				await createTier6(data);
				// only reset after successful create
				form.reset({
					tierValue: "",
					tierValueDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Tier6 submit failed", err);
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
							<FormLabel>Tier6 Option Number</FormLabel>
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
						{tier6 ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
