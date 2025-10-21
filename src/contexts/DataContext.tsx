"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Region } from "../types/region";
import { Supervisor } from "../types/supervisor";

interface DataContextType {
	regions: Region[];
	supervisors: Supervisor[];
	refreshRegions: () => Promise<void>;
	refreshSupervisors: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
	const [regions, setRegions] = useState<Region[]>([]);
	const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

	const fetchRegions = async () => {
		try {
			const response = await fetch("/api/admin/wt/region");
			if (!response.ok) return;
			const data = await response.json();
			setRegions(data);
		} catch (err) {
			console.error("fetchRegions error", err);
		}
	};

	const fetchSupervisors = async () => {
		try {
			const response = await fetch("/api/admin/wt/supervisors");
			if (!response.ok) return;
			const data = await response.json();
			setSupervisors(data);
		} catch (err) {
			console.error("fetchSupervisors error", err);
		}
	};

	useEffect(() => {
		void fetchRegions();
		void fetchSupervisors();
	}, []);

	return (
		<DataContext
			value={{
				regions,
				supervisors,
				refreshRegions: fetchRegions,
				refreshSupervisors: fetchSupervisors,
			}}
		>
			{children}
		</DataContext>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
