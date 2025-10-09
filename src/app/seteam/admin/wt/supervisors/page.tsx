import Sidebar from "@/components/Sidebar";
import SupervisorForm from "@/components/SupervisorForm";
import { Supervisor } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataProvider, useData } from "@/contexts/DataContext";

function SupervisorsContent() {
	const { supervisors } = useData();

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 p-6">
				<h1 className="text-2xl font-bold mb-6">Supervisors</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Add Supervisor</CardTitle>
						</CardHeader>
						<CardContent>
							<SupervisorForm />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Supervisors List</CardTitle>
						</CardHeader>
						<CardContent>
							<ul>
								{supervisors?.map((supervisor: Supervisor) => (
									<li
										key={supervisor._id}
										className="flex justify-between py-2"
									>
										<span>{supervisor.supervisorName}</span>
										<Button asChild>
											<a href={`/wt/admin/supervisors/${supervisor._id}`}>
												Edit
											</a>
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

export default function SupervisorsPage() {
	return (
		<DataProvider>
			<SupervisorsContent />
		</DataProvider>
	);
}
