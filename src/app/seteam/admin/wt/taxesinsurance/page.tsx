// app/taxesInsurances/page.tsx
"use client";

import { useTaxesInsurance } from "@/contexts/TaxesInsuranceContext";
import TaxesInsuranceForm from "@/components/wt/taxesInsurance/TaxesInsuranceForm";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function TaxesInsurancesPage() {
	const { taxesInsurances, deleteTaxesInsurance } = useTaxesInsurance();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isNarrow, setIsNarrow] = useState<boolean>(false);

	useEffect(() => {
		const checkWidth = () => setIsNarrow(window.innerWidth < 500);
		// set initial
		checkWidth();
		window.addEventListener("resize", checkWidth);
		return () => window.removeEventListener("resize", checkWidth);
	}, []);
	console.log(taxesInsurances);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add Taxes Insurance Group</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">
						Edit Taxes Insurance Group
					</h1>
				)}
				{editingId === null && (
					<TaxesInsuranceForm onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit TaxesInsurance</h2>
						<TaxesInsuranceForm
							taxesInsurance={taxesInsurances.find((r) => r._id === editingId)}
							onSuccess={() => setEditingId(null)}
						/>
					</div>
				)}
			</div>
			<div className="container px-4 m-4 bg-primary/10 rounded-2xl">
				<div className="flex flex-row">
					<Item className="w-24 flex-none">
						<ItemContent>
							<ItemTitle>ID</ItemTitle>
						</ItemContent>
					</Item>
					<Item className="w-32 flex-auto">
						<ItemTitle>Taxes & Insurance Group</ItemTitle>
					</Item>
				</div>

				<ul className="mt-4 space-y-2">
					{taxesInsurances.map((reg) => (
						<li key={reg._id} className="flex justify-between items-center">
							<div className="flex">
								<Item className="w-24 flex-none">
									<ItemContent>
										<ItemTitle>{reg.taxesInsuranceId}</ItemTitle>
									</ItemContent>
								</Item>
								<Item className="w-48 flex-auto">
									<ItemDescription>{reg.taxesInsuranceName}</ItemDescription>
								</Item>
							</div>
							<div className="space-x-2">
								<Button variant="outline" onClick={() => setEditingId(reg._id)}>
									Edit
								</Button>
								<Button
									variant="destructive"
									onClick={() => deleteTaxesInsurance(reg._id)}
								>
									Delete
								</Button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
