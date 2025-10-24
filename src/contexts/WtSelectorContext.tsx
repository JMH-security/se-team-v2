// contexts/RegionContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

//import { WtSelectorSchema } from "@/lib/schemas/wtSelectorSchema";
//import { TWtSelector } from "@/types/wtSelector";

// type TUpdateRegion = {
// 	regionId: string;
// 	regionName: string;
// 	regionDescription?: string;
// };

// interface RegionContextType {
// 	regions: TRegion[];
// 	fetchRegions: () => Promise<void>;

// }

// const RegionContext = createContext<RegionContextType | undefined>(undefined);

// export function RegionProvider({ children }: { children: ReactNode }) {
// 	const [regions, setRegions] = useState<TRegion[]>([]);

// 	const fetchWtSelectors = async () => {
// 		const res = await fetch("/api/admin/wt/regions");
// 		if (res.ok) {
// 			const data = await res.json();
// 			setRegions(data);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchRegions();
// 	}, []);

// 	return (
// 		<RegionContext.Provider
// 			value={{
// 				regions,
// 				fetchRegions,
// 				createRegion,
// 				updateRegion,
// 				deleteRegion,
// 			}}
// 		>
// 			{children}
// 		</RegionContext.Provider>
// 	);
// }

// export const useRegion = () => {
// 	const context = useContext(RegionContext);
// 	if (undefined === context) {
// 		throw new Error("useRegion must be used within a RegionProvider");
// 	}
// 	return context;
// };
