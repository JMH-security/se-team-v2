// app/seteam/admin/wt/tier4s/page.tsx
"use client";

import { useTier4 } from "@/contexts/tiers/Tier4Context";
import Tier4Form from "@/components/wt/tiers/Tier4Form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function Tier4sPage() {
	const { tier4s, deleteTier4 } = useTier4();
	const [editingId, setEditingId] = useState<string | null>(null);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add Tier 4 Options</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">Edit Tier Value</h1>
				)}
				{editingId === null && (
					<Tier4Form onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit Tier 4 Options</h2>
						<Tier4Form
							tier4={tier4s.find((r) => r._id === editingId)}
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
					{tier4s.map((reg) => (
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
										onClick={() => deleteTier4(reg._id)}
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
