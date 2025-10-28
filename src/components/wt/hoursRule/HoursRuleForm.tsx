// components/HoursRuleForm.tsx
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
	hoursRuleSchema,
	HoursRuleFormData,
} from "@/lib/schemas/hoursRuleSchema";
import { useHoursRule } from "@/contexts/HoursRuleContext";
import { THoursRule } from "@/types/hoursRule";

interface HoursRuleFormProps {
	hoursRule?: THoursRule;
	onSuccess?: () => void;
}

export default function HoursRuleForm({
	hoursRule,
	onSuccess,
}: HoursRuleFormProps) {
	const { createHoursRule, updateHoursRule } = useHoursRule();

	const form = useForm<HoursRuleFormData>({
		resolver: zodResolver(hoursRuleSchema),
		defaultValues: {
			hoursRuleId: hoursRule?.hoursRuleId || "",
			hoursRuleName: hoursRule?.hoursRuleName || "",
		},
	});

	const onSubmit = async (data: HoursRuleFormData) => {
		try {
			if (hoursRule) {
				await updateHoursRule(hoursRule._id, data);
			} else {
				await createHoursRule(data);
				// only reset after successful create
				form.reset({
					hoursRuleId: "",
					hoursRuleName: "",
				});
			}
			if (onSuccess) onSuccess();
		} catch (err) {
			// keep form values so user can correct and retry
			console.error("HoursRule submit failed", err);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="hoursRuleId"
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
					name="hoursRuleName"
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
						{hoursRule ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
