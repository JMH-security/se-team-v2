// contexts/Tier7Context.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Tier7FormData } from "@/lib/schemas/tiers/tier7Schema";
import { TTier7 } from "@/types/tiers";

type TUpdateTier7 = {
	_id?: string;
	tierValue: string;
	tierValueDescription: string;
};

interface Tier7ContextType {
	tier7s: TTier7[];
	fetchTier7s: () => Promise<void>;
	createTier7: (data: Tier7FormData) => Promise<void>;
	updateTier7: (id: string, data: TUpdateTier7) => Promise<void>;
	deleteTier7: (id: string) => Promise<void>;
}

const Tier7Context = createContext<Tier7ContextType | undefined>(undefined);

export function Tier7Provider({ children }: { children: ReactNode }) {
	const [tier7s, setTier7s] = useState<TTier7[]>([]);

	const fetchTier7s = async () => {
		const res = await fetch("/api/admin/wt/tier/tier7");
		if (res.ok) {
			const data = await res.json();
			setTier7s(data);
		}
	};

	const createTier7 = async (data: Tier7FormData) => {
		const res = await fetch("/api/admin/wt/tier/tier7", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTier7 failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTier7s();
	};

	const updateTier7 = async (id: string, data: TUpdateTier7) => {
		const res = await fetch(`/api/admin/wt/tier/tier7/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTier7 failed: ${res.status} ${text}`);
		}
		await fetchTier7s();
	};

	const deleteTier7 = async (id: string) => {
		const res = await fetch(`/api/admin/wt/tier/tier7/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTier7s();
		}
	};

	useEffect(() => {
		fetchTier7s();
	}, []);

	return (
		<Tier7Context.Provider
			value={{
				tier7s,
				fetchTier7s,
				createTier7,
				updateTier7,
				deleteTier7,
			}}
		>
			{children}
		</Tier7Context.Provider>
	);
}

export const useTier7 = () => {
	const context = useContext(Tier7Context);
	if (undefined === context) {
		throw new Error("useTier7 must be used within a Tier7Provider");
	}
	return context;
};
