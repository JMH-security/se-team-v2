// app/seteam/admin/wt/salesTaxStates/page.tsx
"use client";

import { useSalesTaxState } from "@/contexts/SalesTaxStateContext";
import SalesTaxStateForm from "@/components/wt/salesTaxState/SalesTaxStateForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function SalesTaxStatesPage() {
	const { salesTaxStates, deleteSalesTaxState } = useSalesTaxState();
	const [editingId, setEditingId] = useState<string | null>(null);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="mb-4 text-left">
				<Link href="/seteam/admin/wt">
					<Button variant="outline">Back to WT Admin</Button>
				</Link>
			</div>
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add Sales Tax State</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">Edit Sales Tax State</h1>
				)}
				{editingId === null && (
					<SalesTaxStateForm onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit SalesTaxState</h2>
						<SalesTaxStateForm
							salesTaxState={salesTaxStates.find((r) => r._id === editingId)}
							onSuccess={() => setEditingId(null)}
						/>
					</div>
				)}
			</div>
			<div className="container px-4 m-4 bg-primary/10 rounded-2xl">
				<div className="flex flex-row">
					<Item className="flex-1">
						<ItemContent>
							<ItemTitle>ID</ItemTitle>
						</ItemContent>
					</Item>
					<Item className="flex-4">
						<ItemTitle>Sales Tax State</ItemTitle>
					</Item>
				</div>

				<ul className="mt-4 space-y-2">
					{salesTaxStates.map((reg) => (
						<li key={reg._id} className="flex justify-between items-center">
							<div className="flex flex-wrap  w-full">
								<div className="flex grow ">
									<Item className="flex-1">
										<ItemContent>
											<ItemTitle>{reg.salesTaxStateId}</ItemTitle>
										</ItemContent>
									</Item>
									<Item className="flex-3">
										<ItemDescription>{reg.salesTaxStateName}</ItemDescription>
									</Item>
								</div>
								<div className="flex justify-end items-center">
									<Button
										className="mx-2"
										variant="outline"
										onClick={() => setEditingId(reg._id)}
									>
										Edit
									</Button>
									<Button
										className="mx-2"
										size="sm"
										variant="destructive"
										onClick={() => deleteSalesTaxState(reg._id)}
									>
										Delete
									</Button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
