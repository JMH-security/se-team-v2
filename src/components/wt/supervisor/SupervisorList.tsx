import { Supervisor } from "@/types/supervisor";
import { columns } from "@/components/wt/supervisor/columns";
import { DataTable } from "@/components/wt/supervisor/data-table";

type Props = {
	supervisors: Supervisor[];
};

export default function SupervisorList({ supervisors }: Props) {
	return (
		<div className="container mx-auto">
			<DataTable columns={columns} data={supervisors} />
		</div>
	);
}

// export default function SupervisorList() {
// 	return (
// 		<>
// 			<div>Supervisor List</div>

// 			<ul>
// 				{supervisors?.map((supervisor: Supervisor) => (
// 					<li
// 						key={supervisor._id}
// 						className="flex justify-between py-2 border-b-2 border-accent"
// 					>
// 						<span>{supervisor.supervisorId}</span>
// 						<span>{supervisor.supervisorName}</span>
// 						<Button asChild>
// 							<a href={`/seteam/admin/wt/supervisors/${supervisor._id}`}>
// 								Edit
// 							</a>
// 						</Button>
// 					</li>
// 				))}
// 			</ul>
// 		</>
// 	);
// }
