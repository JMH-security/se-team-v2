"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Schema & Types
import { vendorSchema, VendorFormData } from "@/lib/schemas/vendorSchema";
import { TVendor } from "@/types/vendor";
import { Plus, Trash2 } from "lucide-react";

interface AddVendorProps {
	vendor?: TVendor;
	onSuccess?: () => void;
}

const vendorTypes = [
	{ value: 1, label: "Supplier" },
	{ value: 2, label: "Contractor" },
	{ value: 3, label: "Service Provider" },
	{ value: 4, label: "Other" },
];

const contactRoles = [
	{ value: 1, label: "Primary" },
	{ value: 2, label: "Billing" },
	{ value: 3, label: "Technical" },
	{ value: 4, label: "Other" },
];

const contactTypes = [
	{ value: 1, label: "Main" },
	{ value: 2, label: "Secondary" },
];

export default function AddVendor({ vendor, onSuccess }: AddVendorProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<VendorFormData>({
		resolver: zodResolver(vendorSchema),
		mode: "onBlur",
		defaultValues: {
			_id: vendor?._id || "",
			VendorNumber: vendor?.VendorNumber || null,
			VendorName: vendor?.VendorName || "",
			VendorTypeId: vendor?.VendorTypeId || null,
			VendorStatus: vendor?.VendorStatus ?? true,
			Address: vendor?.Address || {
				Address1: "",
				Address2: "",
				City: "",
				State: "",
				Zip: "",
			},
			Phone: vendor?.Phone || "",
			Fax: vendor?.Fax || "",
			ParentVendorNumber: vendor?.ParentVendorNumber || null,
			AccountNumber: vendor?.AccountNumber || "",
			TaxID: vendor?.TaxID || "",
			ContactsInformation: vendor?.ContactsInformation || [],
			CustomFields: vendor?.CustomFields || [],
		},
	});

	const {
		fields: contactFields,
		append: appendContact,
		remove: removeContact,
	} = useFieldArray({
		control: form.control,
		name: "ContactsInformation",
	});

	const onSubmit = async (data: VendorFormData) => {
		setIsSubmitting(true);
		try {
			const url = vendor
				? `/api/admin/wt/vendors/${vendor._id}`
				: "/api/admin/wt/vendors";
			const method = vendor ? "PUT" : "POST";

			// Remove _id when creating a new vendor (let MongoDB generate it)
			const { _id, ...dataWithoutId } = data;
			const payload = vendor ? data : dataWithoutId;

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to save vendor");
			}

			if (result.wtSync?.success) {
				toast.success("Vendor saved and synced to WinTeam successfully!");
			} else if (result.wtSync?.error) {
				toast.warning(
					`Vendor saved but WinTeam sync failed: ${result.wtSync.error}`
				);
			} else {
				toast.success(vendor ? "Vendor updated!" : "Vendor created!");
			}

			if (!vendor) {
				form.reset();
			}

			onSuccess?.();
		} catch (error) {
			console.error("Error saving vendor:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to save vendor"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const addContact = () => {
		appendContact({
			DisplayName: "",
			FirstName: "",
			LastName: "",
			Email: "",
			BusinessPhone: undefined,
			RoleId: 1,
			TypeId: 1,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Basic Information */}
				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">
						Vendor Information
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="VendorName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vendor Name *</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter vendor name"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="VendorNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vendor Number</FormLabel>
									<FormControl>
										<Input
											type="number"
											value={field.value ?? ""}
											onChange={(e) =>
												field.onChange(
													e.target.value ? Number(e.target.value) : null
												)
											}
											placeholder="Auto-generated if empty"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="VendorTypeId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vendor Type</FormLabel>
									<FormControl>
										<Select
											value={field.value?.toString() || ""}
											onValueChange={(v) =>
												field.onChange(v ? Number(v) : null)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select vendor type" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{vendorTypes.map((type) => (
														<SelectItem
															key={type.value}
															value={type.value.toString()}
														>
															{type.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="VendorStatus"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-8">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Active</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="Phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="1234567890"
											maxLength={10}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="Fax"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Fax</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="1234567890"
											maxLength={10}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="AccountNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Account Number</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="Account number"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="TaxID"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tax ID</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="Tax ID"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ParentVendorNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Parent Vendor Number</FormLabel>
									<FormControl>
										<Input
											type="number"
											value={field.value ?? ""}
											onChange={(e) =>
												field.onChange(
													e.target.value ? Number(e.target.value) : null
												)
											}
											placeholder="Parent vendor number"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Address */}
				<div className="border border-gray-300 rounded-lg p-4">
					<h2 className="text-xl font-medium text-secondary mb-4">Address</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="Address.Address1"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address Line 1</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="Street address"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="Address.Address2"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address Line 2</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="Suite, unit, etc."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="Address.City"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ""}
											placeholder="City"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="Address.State"
								render={({ field }) => (
									<FormItem>
										<FormLabel>State</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value ?? ""}
												placeholder="State"
												maxLength={2}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="Address.Zip"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Zip Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value ?? ""}
												placeholder="12345"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Contacts */}
				<div className="border border-gray-300 rounded-lg p-4">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-medium text-secondary">Contacts</h2>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={addContact}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Contact
						</Button>
					</div>

					{contactFields.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No contacts added. Click "Add Contact" to add one.
						</p>
					) : (
						<div className="space-y-4">
							{contactFields.map((field, index) => (
								<div
									key={field.id}
									className="border border-gray-200 rounded-lg p-4 relative"
								>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="absolute top-2 right-2 text-destructive"
										onClick={() => removeContact(index)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>

									<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pr-8">
										<FormField
											control={form.control}
											name={`ContactsInformation.${index}.FirstName`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>First Name</FormLabel>
													<FormControl>
														<Input
															{...field}
															value={field.value ?? ""}
															placeholder="First name"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`ContactsInformation.${index}.LastName`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Last Name</FormLabel>
													<FormControl>
														<Input
															{...field}
															value={field.value ?? ""}
															placeholder="Last name"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`ContactsInformation.${index}.DisplayName`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Display Name</FormLabel>
													<FormControl>
														<Input
															{...field}
															value={field.value ?? ""}
															placeholder="Display name"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`ContactsInformation.${index}.Email`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="email"
															value={field.value ?? ""}
															placeholder="email@example.com"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`ContactsInformation.${index}.BusinessPhone`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Business Phone</FormLabel>
													<FormControl>
														<Input
															type="number"
															value={field.value ?? ""}
															onChange={(e) =>
																field.onChange(
																	e.target.value
																		? Number(e.target.value)
																		: undefined
																)
															}
															placeholder="1234567890"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`ContactsInformation.${index}.RoleId`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Role</FormLabel>
													<FormControl>
														<Select
															value={field.value?.toString() || ""}
															onValueChange={(v) =>
																field.onChange(v ? Number(v) : undefined)
															}
														>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Select role" />
															</SelectTrigger>
															<SelectContent>
																<SelectGroup>
																	{contactRoles.map((role) => (
																		<SelectItem
																			key={role.value}
																			value={role.value.toString()}
																		>
																			{role.label}
																		</SelectItem>
																	))}
																</SelectGroup>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`ContactsInformation.${index}.TypeId`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Type</FormLabel>
													<FormControl>
														<Select
															value={field.value?.toString() || ""}
															onValueChange={(v) =>
																field.onChange(v ? Number(v) : undefined)
															}
														>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Select type" />
															</SelectTrigger>
															<SelectContent>
																<SelectGroup>
																	{contactTypes.map((type) => (
																		<SelectItem
																			key={type.value}
																			value={type.value.toString()}
																		>
																			{type.label}
																		</SelectItem>
																	))}
																</SelectGroup>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Submit Button */}
				<div className="flex gap-4">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting
							? "Saving..."
							: vendor
								? "Update Vendor"
								: "Create Vendor"}
					</Button>
					{!form.formState.isDirty && (
						<Button
							type="button"
							variant="secondary"
							onClick={() => onSuccess?.()}
						>
							Close
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
}
