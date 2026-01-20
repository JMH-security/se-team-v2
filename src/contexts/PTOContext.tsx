// contexts/PTOContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { PTORequestFormData, PTOApprovalFormData } from "@/lib/schemas/ptoSchema";
import { TPTORequest } from "@/types/pto";

interface PTOContextType {
	ptoRequests: TPTORequest[];
	isLoading: boolean;
	fetchPTORequests: (options?: { all?: boolean; status?: string }) => Promise<void>;
	createPTORequest: (data: PTORequestFormData) => Promise<void>;
	approvePTORequest: (id: string, data: PTOApprovalFormData) => Promise<void>;
	deletePTORequest: (id: string) => Promise<void>;
}

const PTOContext = createContext<PTOContextType | undefined>(undefined);

export function PTOProvider({ children }: { children: ReactNode }) {
	const [ptoRequests, setPTORequests] = useState<TPTORequest[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchPTORequests = async (options?: { all?: boolean; status?: string }) => {
		setIsLoading(true);
		try {
			const params = new URLSearchParams();
			if (options?.all) params.set("all", "true");
			if (options?.status) params.set("status", options.status);

			const url = `/api/pto${params.toString() ? `?${params.toString()}` : ""}`;
			const res = await fetch(url);
			if (res.ok) {
				const data = await res.json();
				setPTORequests(data);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const createPTORequest = async (data: PTORequestFormData) => {
		const res = await fetch("/api/pto", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(errorData.error || `Failed to create PTO request: ${res.status}`);
		}
		// Refresh list after successful create
		await fetchPTORequests();
	};

	const approvePTORequest = async (id: string, data: PTOApprovalFormData) => {
		const res = await fetch(`/api/pto/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			throw new Error(errorData.error || `Failed to update PTO request: ${res.status}`);
		}
		// Refresh list
		await fetchPTORequests({ all: true });
	};

	const deletePTORequest = async (id: string) => {
		const res = await fetch(`/api/pto/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			await fetchPTORequests();
		}
	};

	useEffect(() => {
		fetchPTORequests();
	}, []);

	return (
		<PTOContext.Provider
			value={{
				ptoRequests,
				isLoading,
				fetchPTORequests,
				createPTORequest,
				approvePTORequest,
				deletePTORequest,
			}}
		>
			{children}
		</PTOContext.Provider>
	);
}

export const usePTO = () => {
	const context = useContext(PTOContext);
	if (undefined === context) {
		throw new Error("usePTO must be used within a PTOProvider");
	}
	return context;
};
