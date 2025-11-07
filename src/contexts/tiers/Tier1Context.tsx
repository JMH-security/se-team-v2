// contexts/Tier1Context.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Tier1FormData } from "@/lib/schemas/tiers/tier1Schema";
import { TTier1 } from "@/types/tiers";

type TUpdateTier1 = {
	tier1Id: string;
	tier1Name: string;
	tier1Description?: string;
};

interface Tier1ContextType {
	tier1s: TTier1[];
	fetchTier1s: () => Promise<void>;
	createTier1: (data: Tier1FormData) => Promise<void>;
	updateTier1: (id: string, data: TUpdateTier1) => Promise<void>;
	deleteTier1: (id: string) => Promise<void>;
}

const Tier1Context = createContext<Tier1ContextType | undefined>(undefined);

export function Tier1Provider({ children }: { children: ReactNode }) {
	const [tier1s, setTier1s] = useState<TTier1[]>([]);

	const fetchTier1s = async () => {
		const res = await fetch("/api/admin/wt/tier/tier1");
		if (res.ok) {
			const data = await res.json();
			setTier1s(data);
		}
	};

	const createTier1 = async (data: Tier1FormData) => {
		const res = await fetch("/api/admin/wt/tier/tier1", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTier1 failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTier1s();
	};

	const updateTier1 = async (id: string, data: TUpdateTier1) => {
		const res = await fetch(`/api/admin/wt/tier/tier1/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTier1 failed: ${res.status} ${text}`);
		}
		await fetchTier1s();
	};

	const deleteTier1 = async (id: string) => {
		const res = await fetch(`/api/admin/wt/tier/tier1/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTier1s();
		}
	};

	useEffect(() => {
		fetchTier1s();
	}, []);

	return (
		<Tier1Context.Provider
			value={{
				tier1s,
				fetchTier1s,
				createTier1,
				updateTier1,
				deleteTier1,
			}}
		>
			{children}
		</Tier1Context.Provider>
	);
}

export const useTier1 = () => {
	const context = useContext(Tier1Context);
	if (undefined === context) {
		throw new Error("useTier1 must be used within a Tier1Provider");
	}
	return context;
};
