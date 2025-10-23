// contexts/SupervisorContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Supervisor } from "@/types/supervisor";

interface SupervisorContextType {
	supervisors: Supervisor[];
	fetchSupervisors: () => Promise<void>;
	createSupervisor: (data: {
		supervisorId: string;
		supervisorName: string;
		supervisorEmail: string;
		supervisorCell?: string;
	}) => Promise<void>;
	updateSupervisor: (
		id: string,
		data: {
			supervisorId?: string;
			supervisorName?: string;
			supervisorEmail?: string;
			supervisorCell?: string;
		}
	) => Promise<void>;
	deleteSupervisor: (id: string) => Promise<void>;
}

const SupervisorContext = createContext<SupervisorContextType | undefined>(
	undefined
);

export function SupervisorProvider({ children }: { children: ReactNode }) {
	const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

	const fetchSupervisors = async () => {
		const res = await fetch("/api/admin/wt/supervisors");
		if (res.ok) {
			const data = await res.json();
			setSupervisors(data);
		}
	};

	const createSupervisor = async (data: {
		supervisorId: string;
		supervisorName: string;
		supervisorEmail: string;
		supervisorCell?: string;
	}) => {
		const res = await fetch("/api/admin/wt/supervisors", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createSupervisor failed: ${res.status} ${text}`);
		}
		await fetchSupervisors();
	};

	const updateSupervisor = async (
		id: string,
		data: {
			supervisorId?: string;
			supervisorName?: string;
			supervisorEmail?: string;
			supervisorCell?: string;
		}
	) => {
		const res = await fetch(`/api/admin/wt/supervisors/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateSupervisor failed: ${res.status} ${text}`);
		}
		await fetchSupervisors();
	};

	const deleteSupervisor = async (id: string) => {
		const res = await fetch(`/api/admin/wt/supervisors/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchSupervisors();
		}
	};

	useEffect(() => {
		fetchSupervisors();
	}, []);

	return (
		<SupervisorContext.Provider
			value={{
				supervisors,
				fetchSupervisors,
				createSupervisor,
				updateSupervisor,
				deleteSupervisor,
			}}
		>
			{children}
		</SupervisorContext.Provider>
	);
}

export const useSupervisor = () => {
	const context = useContext(SupervisorContext);
	if (undefined === context) {
		throw new Error("useSupervisor must be used within a SupervisorProvider");
	}
	return context;
};
