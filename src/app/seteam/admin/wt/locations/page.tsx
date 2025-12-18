// app/locations/page.tsx
"use client";

import { useLocation } from "@/contexts/LocationContext";
import LocationForm from "@/components/wt/location/LocationForm";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function LocationsPage() {
	const { locations, deleteLocation } = useLocation();
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isNarrow, setIsNarrow] = useState<boolean>(false);

	useEffect(() => {
		const checkWidth = () => setIsNarrow(window.innerWidth < 500);
		// set initial
		checkWidth();
		window.addEventListener("resize", checkWidth);
		return () => window.removeEventListener("resize", checkWidth);
	}, []);
	console.log(locations);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add a Location</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">Edit Location</h1>
				)}
				{editingId === null && (
					<LocationForm onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit Location</h2>
						<LocationForm
							location={locations.find((r) => r._id === editingId)}
							onSuccess={() => setEditingId(null)}
						/>
					</div>
				)}
			</div>
			<div className="container px-4 m-4 bg-primary/10 rounded-2xl">
				<div className="flex flex-row">
					<Item className="w-24 flex-none">
						<ItemContent>
							<ItemTitle>LocationID</ItemTitle>
						</ItemContent>
					</Item>
					<Item className="w-64 flex-auto">
						{!isNarrow && (
							<ItemTitle>
								<span>Location Description</span>
							</ItemTitle>
						)}
					</Item>
				</div>

				<ul className="mt-4 space-y-2">
					{locations.map((reg) => (
						<li key={reg._id} className="flex justify-between items-center">
							<div className="flex">
								<Item className="w-24 flex-none">
									<ItemContent>
										<ItemTitle>{reg.locationId}</ItemTitle>
									</ItemContent>
								</Item>
								<Item className="w-64 flex-auto">
									{!isNarrow && (
										<ItemDescription>
											<span>{reg.locationDescription}</span>
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
									onClick={() => deleteLocation(reg._id)}
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
