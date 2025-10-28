// contexts/RegionContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { JobPayrollTaxStateFormData } from "@/lib/schemas/jobPayrollTaxState";
import { TJobPayrollTaxState } from "@/types/jobPayrollTaxState";

type TUpdateJobPayrollTaxState = {
	jobPayrollTaxStateId: string;
	jobPayrollTaxStateName: string;
	jobPayrollTaxStateDescription?: string;
};

interface JobPayrollTaxStateContextType {
	jobPayrollTaxStates: TJobPayrollTaxState[];
	fetchJobPayrollTaxStates: () => Promise<void>;
	createJobPayrollTaxState: (data: JobPayrollTaxStateFormData) => Promise<void>;
	updateJobPayrollTaxState: (
		id: string,
		data: TUpdateJobPayrollTaxState
	) => Promise<void>;
	deleteJobPayrollTaxState: (id: string) => Promise<void>;
}

const JobPayrollTaxStateContext = createContext<
	JobPayrollTaxStateContextType | undefined
>(undefined);

export function JobPayrollTaxStateProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [jobPayrollTaxStates, setJobPayrollTaxStates] = useState<
		TJobPayrollTaxState[]
	>([]);

	const fetchJobPayrollTaxStates = async () => {
		const res = await fetch("/api/admin/wt/jobpayrolltaxstate");
		if (res.ok) {
			const data = await res.json();
			setJobPayrollTaxStates(data);
		}
	};

	const createJobPayrollTaxState = async (data: JobPayrollTaxStateFormData) => {
		const res = await fetch("/api/admin/wt/jobpayrolltaxstate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createJobPayrollTaxState failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchJobPayrollTaxStates();
	};

	const updateJobPayrollTaxState = async (
		id: string,
		data: TUpdateJobPayrollTaxState
	) => {
		const res = await fetch(`/api/admin/wt/jobpayrolltaxstate/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateJobPayrollTaxState failed: ${res.status} ${text}`);
		}
		await fetchJobPayrollTaxStates();
	};

	const deleteJobPayrollTaxState = async (id: string) => {
		const res = await fetch(`/api/admin/wt/jobpayrolltaxstate/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchJobPayrollTaxStates();
		}
	};

	useEffect(() => {
		fetchJobPayrollTaxStates();
	}, []);

	return (
		<JobPayrollTaxStateContext.Provider
			value={{
				jobPayrollTaxStates,
				fetchJobPayrollTaxStates,
				createJobPayrollTaxState,
				updateJobPayrollTaxState,
				deleteJobPayrollTaxState,
			}}
		>
			{children}
		</JobPayrollTaxStateContext.Provider>
	);
}

export const useJobPayrollTaxState = () => {
	const context = useContext(JobPayrollTaxStateContext);
	if (undefined === context) {
		throw new Error(
			"useJobPayrollTaxState must be used within a JobPayrollTaxStateProvider"
		);
	}
	return context;
};
