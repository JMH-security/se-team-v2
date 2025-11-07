// app/seteam/admin/wt/tier6s/page.tsx
"use client";

import { useTier6 } from "@/contexts/tiers/Tier6Context";
import Tier6Form from "@/components/wt/tiers/Tier6Form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function Tier6sPage() {
	const { tier6s, deleteTier6 } = useTier6();
	const [editingId, setEditingId] = useState<string | null>(null);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add Tier 6 Options</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">Edit Tier Value</h1>
				)}
				{editingId === null && (
					<Tier6Form onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit Tier 6 Options</h2>
						<Tier6Form
							tier6={tier6s.find((r) => r._id === editingId)}
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
					{tier6s.map((reg) => (
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
										onClick={() => deleteTier6(reg._id)}
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
