// contexts/RegionContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { IRegionDocument } from "@/models/Region";

interface RegionContextType {
	regions: IRegionDocument[];
	fetchRegions: () => Promise<void>;
	createRegion: (data: { name: string }) => Promise<void>;
	updateRegion: (id: string, data: { name: string }) => Promise<void>;
	deleteRegion: (id: string) => Promise<void>;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
	const [regions, setRegions] = useState<IRegionDocument[]>([]);

	const fetchRegions = async () => {
		const res = await fetch("/api/regions");
		if (res.ok) {
			const data = await res.json();
			setRegions(data);
		}
	};

	const createRegion = async (data: { name: string }) => {
		const res = await fetch("/api/regions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (res.ok) {
			fetchRegions();
		}
	};

	const updateRegion = async (id: string, data: { name: string }) => {
		const res = await fetch(`/api/regions/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (res.ok) {
			fetchRegions();
		}
	};

	const deleteRegion = async (id: string) => {
		const res = await fetch(`/api/regions/${id}`, { method: "DELETE" });
		if (res.ok) {
			fetchRegions();
		}
	};

	useEffect(() => {
		fetchRegions();
	}, []);

	return (
		<RegionContext.Provider
			value={{
				regions,
				fetchRegions,
				createRegion,
				updateRegion,
				deleteRegion,
			}}
		>
			{children}
		</RegionContext.Provider>
	);
}

export const useRegion = () => {
	const context = useContext(RegionContext);
	if (undefined === context) {
		throw new Error("useRegion must be used within a RegionProvider");
	}
	return context;
};
