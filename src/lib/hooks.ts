import { SupervisorContext } from "@/contexts/SupervisorContextProvider";
import { useContext } from "react";

export function useSupervisorContext() {
	const context = useContext(SupervisorContext);

	if (!context) {
		throw new Error("usePetContext must be used within a PetContextProvider");
	}

	return context;
}
