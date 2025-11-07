// contexts/Tier4Context.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Tier4FormData } from "@/lib/schemas/tiers/tier4Schema";
import { TTier4 } from "@/types/tiers";

type TUpdateTier4 = {
	tier4Id: string;
	tier4Name: string;
	tier4Description?: string;
};

interface Tier4ContextType {
	tier4s: TTier4[];
	fetchTier4s: () => Promise<void>;
	createTier4: (data: Tier4FormData) => Promise<void>;
	updateTier4: (id: string, data: TUpdateTier4) => Promise<void>;
	deleteTier4: (id: string) => Promise<void>;
}

const Tier4Context = createContext<Tier4ContextType | undefined>(undefined);

export function Tier4Provider({ children }: { children: ReactNode }) {
	const [tier4s, setTier4s] = useState<TTier4[]>([]);

	const fetchTier4s = async () => {
		const res = await fetch("/api/admin/wt/tier/tier4");
		if (res.ok) {
			const data = await res.json();
			setTier4s(data);
		}
	};

	const createTier4 = async (data: Tier4FormData) => {
		const res = await fetch("/api/admin/wt/tier/tier4", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createTier4 failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchTier4s();
	};

	const updateTier4 = async (id: string, data: TUpdateTier4) => {
		const res = await fetch(`/api/admin/wt/tier/tier4/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateTier4 failed: ${res.status} ${text}`);
		}
		await fetchTier4s();
	};

	const deleteTier4 = async (id: string) => {
		const res = await fetch(`/api/admin/wt/tier/tier4/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchTier4s();
		}
	};

	useEffect(() => {
		fetchTier4s();
	}, []);

	return (
		<Tier4Context.Provider
			value={{
				tier4s,
				fetchTier4s,
				createTier4,
				updateTier4,
				deleteTier4,
			}}
		>
			{children}
		</Tier4Context.Provider>
	);
}

export const useTier4 = () => {
	const context = useContext(Tier4Context);
	if (undefined === context) {
		throw new Error("useTier4 must be used within a Tier4Provider");
	}
	return context;
};
