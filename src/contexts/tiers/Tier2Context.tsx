// contexts/Tier2Context.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Tier2FormData } from "@/lib/schemas/tiers/tier2Schema";
import { TTier2 } from "@/types/tiers";

type TUpdateTier2 = {
	tier2Id: string;
	tier2Name: string;
	tier2Description?: string;
};

interface Tier2ContextType {
	tier2s: TTier2[];
	fetchTier2s: () => Promise<void>;
	createTier2: (data: Tier2FormData) => Promise<void>;
	updateTier2: (id: string, data: TUpdateTier2) => Promise<void>;
	deleteTier2: (id: string) => Promise<void>;
}

const Tier2Context = createContext<Tier2ContextType | undefined>(undefined);

export function Tier2Provider({ children }: { children: ReactNode }) {
	const [tier2s, setTier2s] = useState<TTier2[]>([]);

	const fetchTier2s = async () => {
		const res = await fetch("/api/admin/wt/tier/tier2");
		if (res.ok) {
			const data = await res.json();
			setTier2s(data);
		}
	};

	const createTier2 = async (data: Tier2FormData) => {
		const res = await fetch("/api/admin/wt/tier/tier2", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTier2 failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTier2s();
	};

	const updateTier2 = async (id: string, data: TUpdateTier2) => {
		const res = await fetch(`/api/admin/wt/tier/tier2/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTier2 failed: ${res.status} ${text}`);
		}
		await fetchTier2s();
	};

	const deleteTier2 = async (id: string) => {
		const res = await fetch(`/api/admin/wt/tier/tier2/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTier2s();
		}
	};

	useEffect(() => {
		fetchTier2s();
	}, []);

	return (
		<Tier2Context.Provider
			value={{
				tier2s,
				fetchTier2s,
				createTier2,
				updateTier2,
				deleteTier2,
			}}
		>
			{children}
		</Tier2Context.Provider>
	);
}

export const useTier2 = () => {
	const context = useContext(Tier2Context);
	if (undefined === context) {
		throw new Error("useTier2 must be used within a Tier2Provider");
	}
	return context;
};
