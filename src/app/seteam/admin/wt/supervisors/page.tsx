// app/supervisors/page.tsx
"use client";

import { useSupervisor } from "@/contexts/SupervisorContext";
import SupervisorForm from "@/components/wt/supervisor/SupervisorForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SupervisorsPage() {
	const { supervisors, deleteSupervisor } = useSupervisor();
	const [editingId, setEditingId] = useState<string | null>(null);

	return (
		<div className="container mx-auto p-4">
			<div className="container max-w-[800px] border-2 border-red-400 p-4 m-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add a Supervisor</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">Edit Supervisors</h1>
				)}
				{editingId === null && (
					<SupervisorForm onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit Supervisor</h2>
						<SupervisorForm
							supervisor={supervisors.find((s) => s._id === editingId)}
							onSuccess={() => setEditingId(null)}
						/>
					</div>
				)}
			</div>
			<div className="container max-w-[800px] border-2 border-red-400 p-4 m-4">
				<ul className="mt-4 space-y-2">
					{supervisors.map((sup) => (
						<li key={sup._id} className="flex justify-between items-center">
							<span>
								{sup.supervisorName} ({sup.supervisorEmail})
							</span>
							<div className="flex justify-between">
								<Button
									variant="outline"
									className="mx-2"
									onClick={() => setEditingId(sup._id)}
								>
									Edit
								</Button>
								<Button
									variant="destructive"
									className="mx-2"
									onClick={() => deleteSupervisor(sup._id)}
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
