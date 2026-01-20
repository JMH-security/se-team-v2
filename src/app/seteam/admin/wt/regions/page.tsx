// app/regions/page.tsx
"use client";

import { useRegion } from "@/contexts/RegionContext";
import RegionForm from "@/components/wt/region/RegionForm";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

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
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="mb-4 text-left">
				<Link href="/seteam/admin/wt">
					<Button variant="outline">Back to WT Admin</Button>
				</Link>
			</div>
			<div className="bg-primary/10 rounded-2xl px-4">
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
			</div>
			<div className="container px-4 m-4 bg-primary/10 rounded-2xl">
				<div className="flex flex-row">
					<Item className="w-24 flex-none">
						<ItemContent>
							<ItemTitle>RegionID</ItemTitle>
						</ItemContent>
					</Item>
					<Item className="w-32 flex-auto">
						<ItemTitle>Region Name</ItemTitle>
					</Item>

					<Item className="w-64 flex-auto">
						{!isNarrow && (
							<ItemTitle>
								<span>Region Description</span>
							</ItemTitle>
						)}
					</Item>
				</div>

				<ul className="mt-4 space-y-2">
					{regions.map((reg) => (
						<li key={reg._id} className="flex justify-between items-center">
							<div className="flex">
								<Item className="w-24 flex-none">
									<ItemContent>
										<ItemTitle>{reg.regionId}</ItemTitle>
									</ItemContent>
								</Item>
								<Item className="w-48 flex-auto">
									<ItemDescription>{reg.regionName}</ItemDescription>
								</Item>

								<Item className="w-64 flex-auto">
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
									size="sm"
									onClick={() => deleteRegion(reg._id)}
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
