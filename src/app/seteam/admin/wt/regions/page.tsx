"use client";
import Sidebar from "@/components/wt/Sidebar";
import RegionForm from "@/components/wt/RegionForm";
import { Region } from "@/types/region";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataProvider, useData } from "@/contexts/DataContext";

function RegionsContent() {
	const { regions } = useData();
	console.log("RegionsContent regions:", regions);

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 p-6">
				<h1 className="text-2xl font-bold mb-6">Regions</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Add Region</CardTitle>
						</CardHeader>
						<CardContent>
							<RegionForm />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Regions List</CardTitle>
						</CardHeader>
						<CardContent>
							<ul>
								{regions?.map((region: Region) => (
									<li key={region.id} className="flex justify-between py-2">
										<span>{region.name}</span>
										<Button asChild>
											<a href={`/wt/admin/regions/${region.id}`}>Edit</a>
										</Button>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default function RegionsPage() {
	return (
		<DataProvider>
			<RegionsContent />
		</DataProvider>
	);
}
