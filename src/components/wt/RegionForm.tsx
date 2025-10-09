"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { regionSchema } from "@/lib/schemas/regionSchema";
import { Region } from "@/types/region";
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
import { useRouter } from "next/navigation";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";

interface RegionFormProps {
	initialData?: Region;
}

export default function RegionForm({ initialData }: RegionFormProps) {
	const router = useRouter();
	const { refreshRegions } = useData();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		resolver: zodResolver(regionSchema),
		defaultValues: initialData || {
			regionId: "",
			regionName: "",
			regionDescription: "",
		},
	});

	const onSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			const response = await fetch(
				`/api/regions${initialData ? `/${initialData._id}` : ""}`,
				{
					method: initialData ? "PUT" : "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);
			if (!response.ok) throw new Error("Failed to save region");
			await refreshRegions();
			router.push("/wt/admin/regions");
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
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
							<FormLabel>Region ID</FormLabel>
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
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isSubmitting}>
					{initialData ? "Update" : "Create"} Region
				</Button>
			</form>
		</Form>
	);
}
