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
import { RegionFormData } from "@/lib/schemas/regionSchema";

type TUpdateRegion = {
	regionId: string;
	regionName: string;
	regionDescription?: string;
};

interface RegionContextType {
	regions: IRegionDocument[];
	fetchRegions: () => Promise<void>;
	createRegion: (data: RegionFormData) => Promise<void>;
	updateRegion: (id: string, data: TUpdateRegion) => Promise<void>;
	deleteRegion: (id: string) => Promise<void>;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
	const [regions, setRegions] = useState<IRegionDocument[]>([]);

	const fetchRegions = async () => {
		const res = await fetch("/api/admin/wt/regions");
		if (res.ok) {
			const data = await res.json();
			setRegions(data);
		}
	};

	const createRegion = async (data: RegionFormData) => {
		const res = await fetch("/api/admin/wt/regions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createRegion failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchRegions();
	};

	const updateRegion = async (id: string, data: TUpdateRegion) => {
		const res = await fetch(`/api/admin/wt/regions/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateRegion failed: ${res.status} ${text}`);
		}
		await fetchRegions();
	};

	const deleteRegion = async (id: string) => {
		const res = await fetch(`/api/admin/wt/regions/${id}`, {
			method: "DELETE",
		});
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
