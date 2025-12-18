// contexts/LocationContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { LocationFormData } from "@/lib/schemas/locationSchema";
import { TLocation } from "@/types/location";

type TUpdateLocation = {
	locationId: string;
	locationDescription?: string;
};

interface LocationContextType {
	locations: TLocation[];
	fetchLocations: () => Promise<void>;
	createLocation: (data: LocationFormData) => Promise<void>;
	updateLocation: (id: string, data: TUpdateLocation) => Promise<void>;
	deleteLocation: (id: string) => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(
	undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
	const [locations, setLocations] = useState<TLocation[]>([]);

	const fetchLocations = async () => {
		const res = await fetch("/api/admin/wt/locations");
		if (res.ok) {
			const data = await res.json();
			setLocations(data);
		}
	};

	const createLocation = async (data: LocationFormData) => {
		const res = await fetch("/api/admin/wt/locations", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createLocation failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchLocations();
	};

	const updateLocation = async (id: string, data: TUpdateLocation) => {
		const res = await fetch(`/api/admin/wt/locations/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateLocation failed: ${res.status} ${text}`);
		}
		await fetchLocations();
	};

	const deleteLocation = async (id: string) => {
		const res = await fetch(`/api/admin/wt/locations/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchLocations();
		}
	};

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<LocationContext.Provider
			value={{
				locations,
				fetchLocations,
				createLocation,
				updateLocation,
				deleteLocation,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
}

export const useLocation = () => {
	const context = useContext(LocationContext);
	if (undefined === context) {
		throw new Error("useLocation must be used within a LocationProvider");
	}
	return context;
};
