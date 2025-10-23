// app/regions/page.tsx
"use client";

import { useRegion } from "@/contexts/RegionContext";
import RegionForm from "@/components/wt/region/RegionForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Item, ItemContent } from "@/components/ui/item";

export default function RegionsPage() {
	const { regions, deleteRegion } = useRegion();
	const [editingId, setEditingId] = useState<string | null>(null);
	console.log(regions);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Regions</h1>
			<RegionForm onSuccess={() => setEditingId(null)} />
			<ul className="mt-4 space-y-2">
				{regions.map((reg) => (
					<li key={reg._id} className="flex justify-between items-center">
						<Item>
							<ItemContent>
								<span>{reg.name}</span>
							</ItemContent>
						</Item>
						<div>
							<Button variant="outline" onClick={() => setEditingId(reg._id)}>
								Edit
							</Button>
							<Button
								variant="destructive"
								onClick={() => deleteRegion(reg._id)}
							>
								Delete
							</Button>
						</div>
					</li>
				))}
			</ul>
			{editingId && (
				<div className="mt-4">
					<h2>Edit Region</h2>
					<RegionForm
						region={regions.find((r) => r._id === editingId)}
						onSuccess={() => setEditingId(null)}
					/>
				</div>
			)}
		</div>
	);
}
