"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Region, Supervisor } from "@/lib/types";
import connectDB from "@/lib/db";

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
		await connectDB();
		const response = await fetch("/api/regions");
		const data = await response.json();
		setRegions(data);
	};

	const fetchSupervisors = async () => {
		await connectDB();
		const response = await fetch("/api/supervisors");
		const data = await response.json();
		setSupervisors(data);
	};

	useEffect(() => {
		fetchRegions();
		fetchSupervisors();
	}, []);

	return (
		<DataContext.Provider
			value={{
				regions,
				supervisors,
				refreshRegions: fetchRegions,
				refreshSupervisors: fetchSupervisors,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
