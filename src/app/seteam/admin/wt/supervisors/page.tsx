"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/wt/Sidebar";
import SupervisorForm from "@/components/wt/supervisor/SupervisorForm";
import { Supervisor } from "@/types/supervisor";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Button,
} from "@/components/ui/card";
import SupervisorList from "@/components/wt/supervisor/SupervisorList";

function SupervisorsContent() {
	const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

	const fetchSupervisors = async () => {
		try {
			const response = await fetch("/api/admin/wt/supervisors");
			if (!response.ok) return [];
			const data = await response.json();
			setSupervisors(data);
		} catch (err) {
			console.error("fetchSupervisors error", err);
			return [];
		}
	};

	useEffect(() => {
		fetchSupervisors();
	}, []);

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 p-6">
				<h1 className="text-2xl font-bold mb-6">Supervisors</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader className="flex items-center text-2xl">
							<CardTitle>ADD SUPERVISOR</CardTitle>
						</CardHeader>
						<CardContent>
							<SupervisorForm />
						</CardContent>
					</Card>
					<Card>
						<CardContent>
							<SupervisorList supervisors={supervisors} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default function SupervisorsPage() {
	return <SupervisorsContent />;
}
