// contexts/AddJobContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { AddJobFormData } from "@/lib/schemas/addJobSchema";
import { TAddJob } from "@/types/addJob";

interface AddJobContextType {
	addJobs: TAddJob[];
	fetchAddJobs: () => Promise<void>;
	createAddJob: (data: AddJobFormData) => Promise<void>;
	updateAddJob: (id: string, data: AddJobFormData) => Promise<void>;
	deleteAddJob: (id: string) => Promise<void>;
}

const AddJobContext = createContext<AddJobContextType | undefined>(undefined);

export function AddJobProvider({ children }: { children: ReactNode }) {
	const [addJobs, setAddJobs] = useState<TAddJob[]>([]);

	const fetchAddJobs = async () => {
		const res = await fetch("/api/jobs");
		if (res.ok) {
			const data = await res.json();
			setAddJobs(data);
		}
	};

	const createAddJob = async (data: AddJobFormData) => {
		console.log("Creating Add Job with data:", data);
		const res = await fetch("/api/jobs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createAddJob failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchAddJobs();
	};

	const updateAddJob = async (id: string, data: AddJobFormData) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateAddJob failed: ${res.status} ${text}`);
		}
		await fetchAddJobs();
	};

	const deleteAddJob = async (id: string) => {
		const res = await fetch(`/api/jobs/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchAddJobs();
		}
	};

	useEffect(() => {
		fetchAddJobs();
	}, []);

	return (
		<AddJobContext.Provider
			value={{
				addJobs,
				fetchAddJobs,
				createAddJob,
				updateAddJob,
				deleteAddJob,
			}}
		>
			{children}
		</AddJobContext.Provider>
	);
}

export const useAddJob = () => {
	const context = useContext(AddJobContext);
	if (undefined === context) {
		throw new Error("useAddJob must be used within a AddJobProvider");
	}
	return context;
};
