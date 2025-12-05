// contexts/CustomerJobsContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { CustomerJobsFormData } from "@/lib/schemas/customerJobs";
import { TCustomerJobs, TJobList } from "@/types/customerJobs";

type TUpdateCustomerJobs = {
	customerId: string;
	customerNumber: string;
	customerJobsList?: TJobList[];
};

interface CustomerJobsContextType {
	customerJobs: TCustomerJobs[];
	fetchCustomerJobs: () => Promise<void>;
	createCustomerJob: (data: CustomerJobsFormData) => Promise<void>;
	updateCustomerJob: (id: string, data: TUpdateCustomerJobs) => Promise<void>;
	deleteCustomerJob: (id: string) => Promise<void>;
}

const CustomerJobsContext = createContext<CustomerJobsContextType | undefined>(
	undefined
);

export function CustomerJobsProvider({ children }: { children: ReactNode }) {
	const [customerJobs, setCustomerJobs] = useState<TCustomerJobs[]>([]);

	const fetchCustomerJobs = async () => {
		const res = await fetch("/api/customerjobs");
		if (res.ok) {
			const data = await res.json();
			setCustomerJobs(data);
		}
	};

	const createCustomerJob = async (data: CustomerJobsFormData) => {
		const res = await fetch("/api/customerjobs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createCustomerJobs failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchCustomerJobs();
	};

	const updateCustomerJob = async (id: string, data: TUpdateCustomerJobs) => {
		const res = await fetch(`/api/customerjobs/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateCustomerJobs failed: ${res.status} ${text}`);
		}
		await fetchCustomerJobs();
	};

	const deleteCustomerJob = async (id: string) => {
		const res = await fetch(`/api/customerjobs/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchCustomerJobs();
		}
	};

	useEffect(() => {
		fetchCustomerJobs();
	}, []);

	return (
		<CustomerJobsContext.Provider
			value={{
				customerJobs,
				fetchCustomerJobs,
				createCustomerJob,
				updateCustomerJob,
				deleteCustomerJob,
			}}
		>
			{children}
		</CustomerJobsContext.Provider>
	);
}

export const useCustomerJobs = () => {
	const context = useContext(CustomerJobsContext);
	if (undefined === context) {
		throw new Error(
			"useCustomerJobs must be used within a CustomerJobsProvider"
		);
	}
	return context;
};
