"use client";
import { Supervisor } from "@/types/supervisor";
import { DataTable } from "@/components/wt/supervisor/data-table";
import { columns } from "@/components/wt/supervisor/columns";
import { useContext } from "react";
import { SupervisorContext } from "@/contexts/SupervisorContextProvider";

export default function SupervisorList() {
	const supervisorContextData = useContext(SupervisorContext);
	const data: Supervisor[] = supervisorContextData?.data || [];

	return (
		<>
			<div className="container mx-auto">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
