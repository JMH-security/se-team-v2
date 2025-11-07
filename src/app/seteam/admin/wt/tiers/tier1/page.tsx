// app/seteam/admin/wt/tier1s/page.tsx
"use client";

import { useTier1 } from "@/contexts/tiers/Tier1Context";
import Tier1Form from "@/components/wt/tiers/Tier1Form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function Tier1sPage() {
	const { tier1s, deleteTier1 } = useTier1();
	const [editingId, setEditingId] = useState<string | null>(null);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add Tier 1 Options</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">Edit Tier Value</h1>
				)}
				{editingId === null && (
					<Tier1Form onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit Tier 1 Option</h2>
						<Tier1Form
							tier1={tier1s.find((r) => r._id === editingId)}
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
						<ItemTitle>Option Description</ItemTitle>
					</Item>
				</div>

				<ul className="mt-4 space-y-2">
					{tier1s.map((reg) => (
						<li key={reg._id} className="flex justify-between items-center">
							<div className="flex flex-wrap  w-full">
								<div className="flex grow ">
									<Item className="flex-1">
										<ItemContent>
											<ItemTitle>{reg.tierValue}</ItemTitle>
										</ItemContent>
									</Item>
									<Item className="flex-3">
										<ItemDescription>
											{reg.tierValueDescription}
										</ItemDescription>
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
										onClick={() => deleteTier1(reg._id)}
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
