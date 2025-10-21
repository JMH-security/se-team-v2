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
			<h1 className="text-2xl font-bold mb-4">Supervisors</h1>
			<SupervisorForm onSuccess={() => setEditingId(null)} />
			<ul className="mt-4 space-y-2">
				{supervisors.map((sup) => (
					<li key={sup._id} className="flex justify-between items-center">
						<span>
							{sup.supervisorName} ({sup.supervisorEmail})
						</span>
						<div>
							<Button variant="outline" onClick={() => setEditingId(sup._id)}>
								Edit
							</Button>
							<Button
								variant="destructive"
								onClick={() => deleteSupervisor(sup._id)}
							>
								Delete
							</Button>
						</div>
					</li>
				))}
			</ul>
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
	);
}
