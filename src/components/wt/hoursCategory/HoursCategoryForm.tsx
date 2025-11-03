// components/HoursCategoryForm.tsx
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
import {
	hoursCategorySchema,
	HoursCategoryFormData,
} from "@/lib/schemas/hoursCategorySchema";
import { useHoursCategory } from "@/contexts/HoursCategoryContext";
import { THoursCategory } from "@/types/hoursCategory";

interface HoursCategoryFormProps {
	hoursCategory?: THoursCategory;
	onSuccess?: () => void;
}

export default function HoursCategoryForm({
	hoursCategory,
	onSuccess,
}: HoursCategoryFormProps) {
	const { createHoursCategory, updateHoursCategory } = useHoursCategory();

	const form = useForm<HoursCategoryFormData>({
		resolver: zodResolver(hoursCategorySchema),
		defaultValues: {
			hoursCategoryId: hoursCategory?.hoursCategoryId || "",
			hoursCategoryName: hoursCategory?.hoursCategoryName || "",
		},
	});

	const onSubmit = async (data: HoursCategoryFormData) => {
		try {
			if (hoursCategory) {
				await updateHoursCategory(hoursCategory._id, data);
			} else {
				await createHoursCategory(data);
				// only reset after successful create
				form.reset({
					hoursCategoryId: "",
					hoursCategoryName: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("HoursCategory submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="hoursCategoryId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ID</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="hoursCategoryName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<Button className="mb-4" type="submit">
						{hoursCategory ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
