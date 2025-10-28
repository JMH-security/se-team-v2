// contexts/RegionContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { HoursRuleFormData } from "@/lib/schemas/hoursRuleSchema";
import { THoursRule } from "@/types/hoursRule";

type TUpdateHoursRule = {
	hoursRuleId: string;
	hoursRuleName: string;
	hoursRuleDescription?: string;
};

interface HoursRuleContextType {
	hoursRules: THoursRule[];
	fetchHoursRules: () => Promise<void>;
	createHoursRule: (data: HoursRuleFormData) => Promise<void>;
	updateHoursRule: (id: string, data: TUpdateHoursRule) => Promise<void>;
	deleteHoursRule: (id: string) => Promise<void>;
}

const HoursRuleContext = createContext<HoursRuleContextType | undefined>(
	undefined
);

export function HoursRuleProvider({ children }: { children: ReactNode }) {
	const [hoursRules, setHoursRules] = useState<THoursRule[]>([]);

	const fetchHoursRules = async () => {
		const res = await fetch("/api/admin/wt/hoursrule");
		if (res.ok) {
			const data = await res.json();
			setHoursRules(data);
		}
	};

	const createHoursRule = async (data: HoursRuleFormData) => {
		const res = await fetch("/api/admin/wt/hoursrule", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`createHoursRule failed: ${res.status} ${text}`);
		}
		// refresh list after successful create
		await fetchHoursRules();
	};

	const updateHoursRule = async (id: string, data: TUpdateHoursRule) => {
		const res = await fetch(`/api/admin/wt/hoursrule/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new Error(`updateHoursRule failed: ${res.status} ${text}`);
		}
		await fetchHoursRules();
	};

	const deleteHoursRule = async (id: string) => {
		const res = await fetch(`/api/admin/wt/hoursrule/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			fetchHoursRules();
		}
	};

	useEffect(() => {
		fetchHoursRules();
	}, []);

	return (
		<HoursRuleContext.Provider
			value={{
				hoursRules,
				fetchHoursRules,
				createHoursRule,
				updateHoursRule,
				deleteHoursRule,
			}}
		>
			{children}
		</HoursRuleContext.Provider>
	);
}

export const useHoursRule = () => {
	const context = useContext(HoursRuleContext);
	if (undefined === context) {
		throw new Error("useHoursRule must be used within a HoursRuleProvider");
	}
	return context;
};
