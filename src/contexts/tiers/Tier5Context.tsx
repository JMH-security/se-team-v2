// contexts/Tier5Context.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Tier5FormData } from "@/lib/schemas/tiers/tier5Schema";
import { TTier5 } from "@/types/tiers";

type TUpdateTier5 = {
	_id?: string;
	tierValue: string;
	tierValueDescription: string;
};

interface Tier5ContextType {
	tier5s: TTier5[];
	fetchTier5s: () => Promise<void>;
	createTier5: (data: Tier5FormData) => Promise<void>;
	updateTier5: (id: string, data: TUpdateTier5) => Promise<void>;
	deleteTier5: (id: string) => Promise<void>;
}

const Tier5Context = createContext<Tier5ContextType | undefined>(undefined);

export function Tier5Provider({ children }: { children: ReactNode }) {
	const [tier5s, setTier5s] = useState<TTier5[]>([]);

	const fetchTier5s = async () => {
		const res = await fetch("/api/admin/wt/tier/tier5");
		if (res.ok) {
			const data = await res.json();
			setTier5s(
				data.sort((a: TTier5, b: TTier5) => {
					const aValue = parseInt(a.tierValue, 10);
					const bValue = parseInt(b.tierValue, 10);
					return aValue - bValue;
				})
			);
		}
	};

	const createTier5 = async (data: Tier5FormData) => {
		const res = await fetch("/api/admin/wt/tier/tier5", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTier5 failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTier5s();
	};

	const updateTier5 = async (id: string, data: TUpdateTier5) => {
		const res = await fetch(`/api/admin/wt/tier/tier5/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTier5 failed: ${res.status} ${text}`);
		}
		await fetchTier5s();
	};

	const deleteTier5 = async (id: string) => {
		const res = await fetch(`/api/admin/wt/tier/tier5/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTier5s();
		}
	};

	useEffect(() => {
		fetchTier5s();
	}, []);

	return (
		<Tier5Context.Provider
			value={{
				tier5s,
				fetchTier5s,
				createTier5,
				updateTier5,
				deleteTier5,
			}}
		>
			{children}
		</Tier5Context.Provider>
	);
}

export const useTier5 = () => {
	const context = useContext(Tier5Context);
	if (undefined === context) {
		throw new Error("useTier5 must be used within a Tier5Provider");
	}
	return context;
};
