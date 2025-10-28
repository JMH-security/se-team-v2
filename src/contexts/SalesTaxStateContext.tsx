// contexts/RegionContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { SalesTaxStateFormData } from "@/lib/schemas/salesTaxStateSchema";
import { TSalesTaxState } from "@/types/salestaxstate";

type TUpdateSalesTaxState = {
	salesTaxStateId: string;
	salesTaxStateName: string;
};

interface SalesTaxStateContextType {
	salesTaxStates: TSalesTaxState[];
	fetchSalesTaxStates: () => Promise<void>;
	createSalesTaxState: (data: SalesTaxStateFormData) => Promise<void>;
	updateSalesTaxState: (
		id: string,
		data: TUpdateSalesTaxState
	) => Promise<void>;
	deleteSalesTaxState: (id: string) => Promise<void>;
}

const SalesTaxStateContext = createContext<
	SalesTaxStateContextType | undefined
>(undefined);

export function SalesTaxStateProvider({ children }: { children: ReactNode }) {
	const [salesTaxStates, setSalesTaxStates] = useState<TSalesTaxState[]>([]);

	const fetchSalesTaxStates = async () => {
		const res = await fetch("/api/admin/wt/salestaxstate");
		if (res.ok) {
			const data = await res.json();
			setSalesTaxStates(data);
		}
	};

	const createSalesTaxState = async (data: SalesTaxStateFormData) => {
		const res = await fetch("/api/admin/wt/salestaxstate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createSalesTaxState failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchSalesTaxStates();
	};

	const updateSalesTaxState = async (
		id: string,
		data: TUpdateSalesTaxState
	) => {
		const res = await fetch(`/api/admin/wt/salestaxstate/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateSalesTaxState failed: ${res.status} ${text}`);
		}
		await fetchSalesTaxStates();
	};

	const deleteSalesTaxState = async (id: string) => {
		const res = await fetch(`/api/admin/wt/salestaxstate/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchSalesTaxStates();
		}
	};

	useEffect(() => {
		fetchSalesTaxStates();
	}, []);

	return (
		<SalesTaxStateContext.Provider
			value={{
				salesTaxStates,
				fetchSalesTaxStates,
				createSalesTaxState,
				updateSalesTaxState,
				deleteSalesTaxState,
			}}
		>
			{children}
		</SalesTaxStateContext.Provider>
	);
}

export const useSalesTaxState = () => {
	const context = useContext(SalesTaxStateContext);
	if (undefined === context) {
		throw new Error(
			"useSalesTaxState must be used within a SalesTaxStateProvider"
		);
	}
	return context;
};
