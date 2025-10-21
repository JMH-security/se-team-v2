// components/RegionForm.tsx
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
import { regionSchema, RegionFormData } from "@/schemas/regionSchema";
import { useRegion } from "@/contexts/RegionContext";

interface RegionFormProps {
	region?: { _id: string; name: string };
	onSuccess?: () => void;
}

export default function RegionForm({ region, onSuccess }: RegionFormProps) {
	const { createRegion, updateRegion } = useRegion();

	const form = useForm<RegionFormData>({
		resolver: zodResolver(regionSchema),
		defaultValues: {
			name: region?.name || "",
		},
	});

	const onSubmit = async (data: RegionFormData) => {
		if (region) {
			await updateRegion(region._id, data);
		} else {
			await createRegion(data);
		}
		if (onSuccess) onSuccess();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">{region ? "Update" : "Create"}</Button>
			</form>
		</Form>
	);
}
