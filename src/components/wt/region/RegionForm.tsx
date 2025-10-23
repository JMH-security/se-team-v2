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
import { regionSchema, RegionFormData } from "@/lib/schemas/regionSchema";
import { useRegion } from "@/contexts/RegionContext";
import { Region } from "@/types/region";

interface RegionFormProps {
	region?: Region;
	onSuccess?: () => void;
}

export default function RegionForm({ region, onSuccess }: RegionFormProps) {
	const { createRegion, updateRegion } = useRegion();

	const form = useForm<RegionFormData>({
		resolver: zodResolver(regionSchema),
		defaultValues: {
			regionId: region?.regionId || "",
			regionName: region?.regionName || "",
			regionDescription: region?.regionDescription || "",
		},
	});

	const onSubmit = async (data: RegionFormData) => {
		try {
			if (region) {
				await updateRegion(region._id, data);
			} else {
				await createRegion(data);
				// only reset after successful create
				form.reset({
					regionId: "",
					regionName: "",
					regionDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Region submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="regionId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Region Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="regionName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Region Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="regionDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Region Description</FormLabel>
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
