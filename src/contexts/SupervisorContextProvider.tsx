"use client";

import { Supervisor } from "@/types/supervisor";
import { createContext, useState } from "react";

type SupervisorContextProviderProps = {
	data: Supervisor[];
	children: React.ReactNode;
};

type TSupervisorContext = {
	data: Supervisor[];
	selectedSupervisorId: Supervisor["_id"] | null;
	selectedSupervisor: Supervisor | undefined;
};

export const SupervisorContext = createContext<TSupervisorContext | null>(null);

export default function SupervisorContextProvider({
	data,
	children,
}: SupervisorContextProviderProps) {
	const selectedSupervisorId = null;
	const selectedSupervisor = {};

	return (
		<SupervisorContext
			value={{
				data,
				selectedSupervisorId,
				selectedSupervisor,
			}}
		>
			{children}
		</SupervisorContext>
	);
}
