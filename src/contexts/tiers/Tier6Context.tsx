// contexts/Tier6Context.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Tier6FormData } from "@/lib/schemas/tiers/tier6Schema";
import { TTier6 } from "@/types/tiers";

type TUpdateTier6 = {
	tier6Id: string;
	tier6Name: string;
	tier6Description?: string;
};

interface Tier6ContextType {
	tier6s: TTier6[];
	fetchTier6s: () => Promise<void>;
	createTier6: (data: Tier6FormData) => Promise<void>;
	updateTier6: (id: string, data: TUpdateTier6) => Promise<void>;
	deleteTier6: (id: string) => Promise<void>;
}

const Tier6Context = createContext<Tier6ContextType | undefined>(undefined);

export function Tier6Provider({ children }: { children: ReactNode }) {
	const [tier6s, setTier6s] = useState<TTier6[]>([]);

	const fetchTier6s = async () => {
		const res = await fetch("/api/admin/wt/tier/tier6");
		if (res.ok) {
			const data = await res.json();
			setTier6s(data);
		}
	};

	const createTier6 = async (data: Tier6FormData) => {
		const res = await fetch("/api/admin/wt/tier/tier6", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTier6 failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTier6s();
	};

	const updateTier6 = async (id: string, data: TUpdateTier6) => {
		const res = await fetch(`/api/admin/wt/tier/tier6/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTier6 failed: ${res.status} ${text}`);
		}
		await fetchTier6s();
	};

	const deleteTier6 = async (id: string) => {
		const res = await fetch(`/api/admin/wt/tier/tier6/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTier6s();
		}
	};

	useEffect(() => {
		fetchTier6s();
	}, []);

	return (
		<Tier6Context.Provider
			value={{
				tier6s,
				fetchTier6s,
				createTier6,
				updateTier6,
				deleteTier6,
			}}
		>
			{children}
		</Tier6Context.Provider>
	);
}

export const useTier6 = () => {
	const context = useContext(Tier6Context);
	if (undefined === context) {
		throw new Error("useTier6 must be used within a Tier6Provider");
	}
	return context;
};
