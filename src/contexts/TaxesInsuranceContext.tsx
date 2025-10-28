// contexts/RegionContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { TaxesInsuranceFormData } from "@/lib/schemas/taxesInsuranceSchema";
import { TTaxesInsurance } from "@/types/taxesInsurance";

type TUpdateTaxesInsurance = {
	taxesInsuranceId: string;
	taxesInsuranceName: string;
	taxesInsuranceDescription?: string;
};

interface TaxesInsuranceContextType {
	taxesInsurances: TTaxesInsurance[];
	fetchTaxesInsurances: () => Promise<void>;
	createTaxesInsurance: (data: TaxesInsuranceFormData) => Promise<void>;
	updateTaxesInsurance: (
		id: string,
		data: TUpdateTaxesInsurance
	) => Promise<void>;
	deleteTaxesInsurance: (id: string) => Promise<void>;
}

const TaxesInsuranceContext = createContext<
	TaxesInsuranceContextType | undefined
>(undefined);

export function TaxesInsuranceProvider({ children }: { children: ReactNode }) {
	const [taxesInsurances, setTaxesInsurances] = useState<TTaxesInsurance[]>([]);

	const fetchTaxesInsurances = async () => {
		const res = await fetch("/api/admin/wt/taxesinsurances");
		if (res.ok) {
			const data = await res.json();
			setTaxesInsurances(data);
		}
	};

	const createTaxesInsurance = async (data: TaxesInsuranceFormData) => {
		const res = await fetch("/api/admin/wt/taxesinsurances", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTaxesInsurance failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTaxesInsurances();
	};

	const updateTaxesInsurance = async (
		id: string,
		data: TUpdateTaxesInsurance
	) => {
		const res = await fetch(`/api/admin/wt/taxesinsurances/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTaxesInsurance failed: ${res.status} ${text}`);
		}
		await fetchTaxesInsurances();
	};

	const deleteTaxesInsurance = async (id: string) => {
		const res = await fetch(`/api/admin/wt/taxesinsurances/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTaxesInsurances();
		}
	};

	useEffect(() => {
		fetchTaxesInsurances();
	}, []);

	return (
		<TaxesInsuranceContext.Provider
			value={{
				taxesInsurances,
				fetchTaxesInsurances,
				createTaxesInsurance,
				updateTaxesInsurance,
				deleteTaxesInsurance,
			}}
		>
			{children}
		</TaxesInsuranceContext.Provider>
	);
}

export const useTaxesInsurance = () => {
	const context = useContext(TaxesInsuranceContext);
	if (undefined === context) {
		throw new Error(
			"useTaxesInsurance must be used within a TaxesInsuranceProvider"
		);
	}
	return context;
};
