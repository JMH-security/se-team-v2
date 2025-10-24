// app/regions/page.tsx
"use client";

import { useRegion } from "@/contexts/RegionContext";
import RegionForm from "@/components/wt/region/RegionForm";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";

export default function RegionsPage() {
	const { regions, deleteRegion } = useRegion();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isNarrow, setIsNarrow] = useState<boolean>(false);

	useEffect(() => {
		const checkWidth = () => setIsNarrow(window.innerWidth < 500);
		// set initial
		checkWidth();
		window.addEventListener("resize", checkWidth);
		return () => window.removeEventListener("resize", checkWidth);
	}, []);
	console.log(regions);

	return (
		<div className="container mx-auto text-center p-4">
			{editingId === null && (
				<h1 className="text-2xl font-bold mb-4">Add a Region</h1>
			)}
			{editingId && <h1 className="text-2xl font-bold mb-4">Edit Region</h1>}
			{editingId === null && (
				<RegionForm onSuccess={() => setEditingId(null)} />
			)}
			{editingId && (
				<div className="mt-4">
					<h2>Edit Region</h2>
					<RegionForm
						region={regions.find((r) => r._id === editingId)}
						onSuccess={() => setEditingId(null)}
					/>
				</div>
			)}
			<ul className="mt-4 space-y-2">
				{regions.map((reg) => (
					<li key={reg._id} className="flex justify-between items-center">
						<div className="flex">
							<Item>
								<ItemContent>
									<span>{reg.regionId}</span>
								</ItemContent>
							</Item>
							<Item className="items-center space-x-4">
								<ItemContent>
									<span>{reg.regionName}</span>
								</ItemContent>
								{!isNarrow && (
									<ItemDescription>
										<span>{reg.regionDescription}</span>
									</ItemDescription>
								)}
							</Item>
						</div>
						<div className="space-x-2">
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
		</div>
	);
}
