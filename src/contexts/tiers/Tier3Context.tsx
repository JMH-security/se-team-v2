// contexts/Tier3Context.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Tier3FormData } from "@/lib/schemas/tiers/tier3Schema";
import { TTier3 } from "@/types/tiers";

type TUpdateTier3 = {
	tier3Id: string;
	tier3Name: string;
	tier3Description?: string;
};

interface Tier3ContextType {
	tier3s: TTier3[];
	fetchTier3s: () => Promise<void>;
	createTier3: (data: Tier3FormData) => Promise<void>;
	updateTier3: (id: string, data: TUpdateTier3) => Promise<void>;
	deleteTier3: (id: string) => Promise<void>;
}

const Tier3Context = createContext<Tier3ContextType | undefined>(undefined);

export function Tier3Provider({ children }: { children: ReactNode }) {
	const [tier3s, setTier3s] = useState<TTier3[]>([]);

	const fetchTier3s = async () => {
		const res = await fetch("/api/admin/wt/tier/tier3");
		if (res.ok) {
			const data = await res.json();
			setTier3s(data);
		}
	};

	const createTier3 = async (data: Tier3FormData) => {
		const res = await fetch("/api/admin/wt/tier/tier3", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTier3 failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTier3s();
	};

	const updateTier3 = async (id: string, data: TUpdateTier3) => {
		const res = await fetch(`/api/admin/wt/tier/tier3/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTier3 failed: ${res.status} ${text}`);
		}
		await fetchTier3s();
	};

	const deleteTier3 = async (id: string) => {
		const res = await fetch(`/api/admin/wt/tier/tier3/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTier3s();
		}
	};

	useEffect(() => {
		fetchTier3s();
	}, []);

	return (
		<Tier3Context.Provider
			value={{
				tier3s,
				fetchTier3s,
				createTier3,
				updateTier3,
				deleteTier3,
			}}
		>
			{children}
		</Tier3Context.Provider>
	);
}

export const useTier3 = () => {
	const context = useContext(Tier3Context);
	if (undefined === context) {
		throw new Error("useTier3 must be used within a Tier3Provider");
	}
	return context;
};
