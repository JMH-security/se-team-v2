// components/LocationForm.tsx
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
import { locationSchema, LocationFormData } from "@/lib/schemas/locationSchema";
import { useLocation } from "@/contexts/LocationContext";
import { TLocation } from "@/types/location";

interface LocationFormProps {
	location?: TLocation;
	onSuccess?: () => void;
}

export default function LocationForm({
	location,
	onSuccess,
}: LocationFormProps) {
	const { createLocation, updateLocation } = useLocation();

	const form = useForm<LocationFormData>({
		resolver: zodResolver(locationSchema),
		defaultValues: {
			locationId: location?.locationId || "",
			locationDescription: location?.locationDescription || "",
		},
	});

	const onSubmit = async (data: LocationFormData) => {
		try {
			if (location) {
				await updateLocation(location._id, data);
			} else {
				await createLocation(data);
				// only reset after successful create
				form.reset({
					locationId: "",
					locationDescription: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("Location submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="locationId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Location Id</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="locationDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Location Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button className="mb-4" type="submit">
						{location ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
