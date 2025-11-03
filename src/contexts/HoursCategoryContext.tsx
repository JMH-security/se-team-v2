// contexts/HoursCategoryContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { HoursCategoryFormData } from "@/lib/schemas/hoursCategorySchema";
import { THoursCategory } from "@/types/hoursCategory";

type TUpdateHoursCategory = {
	hoursCategoryId: string;
	hoursCategoryName: string;
	hoursCategoryDescription?: string;
};

interface HoursCategoryContextType {
	hoursCategorys: THoursCategory[];
	fetchHoursCategorys: () => Promise<void>;
	createHoursCategory: (data: HoursCategoryFormData) => Promise<void>;
	updateHoursCategory: (
		id: string,
		data: TUpdateHoursCategory
	) => Promise<void>;
	deleteHoursCategory: (id: string) => Promise<void>;
}

const HoursCategoryContext = createContext<
	HoursCategoryContextType | undefined
>(undefined);

export function HoursCategoryProvider({ children }: { children: ReactNode }) {
	const [hoursCategorys, setHoursCategorys] = useState<THoursCategory[]>([]);

	const fetchHoursCategorys = async () => {
		const res = await fetch("/api/admin/wt/hourscategory");
		if (res.ok) {
			const data = await res.json();
			setHoursCategorys(data);
		}
	};

	const createHoursCategory = async (data: HoursCategoryFormData) => {
		const res = await fetch("/api/admin/wt/hourscategory", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createHoursCategory failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchHoursCategorys();
	};

	const updateHoursCategory = async (
		id: string,
		data: TUpdateHoursCategory
	) => {
		const res = await fetch(`/api/admin/wt/hourscategory/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateHoursCategory failed: ${res.status} ${text}`);
		}
		await fetchHoursCategorys();
	};

	const deleteHoursCategory = async (id: string) => {
		const res = await fetch(`/api/admin/wt/hourscategory/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchHoursCategorys();
		}
	};

	useEffect(() => {
		fetchHoursCategorys();
	}, []);

	return (
		<HoursCategoryContext.Provider
			value={{
				hoursCategorys,
				fetchHoursCategorys,
				createHoursCategory,
				updateHoursCategory,
				deleteHoursCategory,
			}}
		>
			{children}
		</HoursCategoryContext.Provider>
	);
}

export const useHoursCategory = () => {
	const context = useContext(HoursCategoryContext);
	if (undefined === context) {
		throw new Error(
			"useHoursCategory must be used within a HoursCategoryProvider"
		);
	}
	return context;
};
