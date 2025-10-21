// contexts/SupervisorContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { ISupervisorDocument } from "@/models/Supervisor";

interface SupervisorContextType {
	supervisors: ISupervisorDocument[];
	fetchSupervisors: () => Promise<void>;
	createSupervisor: (data: { name: string; email: string }) => Promise<void>;
	updateSupervisor: (
		id: string,
		data: { name: string; email: string }
	) => Promise<void>;
	deleteSupervisor: (id: string) => Promise<void>;
}

const SupervisorContext = createContext<SupervisorContextType | undefined>(
	undefined
);

export function SupervisorProvider({ children }: { children: ReactNode }) {
	const [supervisors, setSupervisors] = useState<ISupervisorDocument[]>([]);

	const fetchSupervisors = async () => {
		const res = await fetch("/api/admin/wt/supervisors");
		if (res.ok) {
			const data = await res.json();
			setSupervisors(data);
		}
	};

	const createSupervisor = async (data: { name: string; email: string }) => {
		const res = await fetch("/api/admin/wt/supervisors", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (res.ok) {
			fetchSupervisors();
		}
	};

	const updateSupervisor = async (
		id: string,
		data: { name: string; email: string }
	) => {
		const res = await fetch(`/api/admin/wt/supervisors/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (res.ok) {
			fetchSupervisors();
		}
	};

	const deleteSupervisor = async (id: string) => {
		const res = await fetch(`/api/supervisors/${id}`, { method: "DELETE" });
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
