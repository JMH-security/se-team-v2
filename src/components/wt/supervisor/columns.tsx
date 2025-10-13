import { ColumnDef } from "@tanstack/react-table";
import { Supervisor } from "@/types/supervisor";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Supervisor>[] = [
	{
		accessorKey: "supervisorId",
		header: ({ column }) => {
			return (
				<Button
					variant="transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Supervisor ID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "supervisorName",
		header: ({ column }) => {
			return (
				<Button
					variant="transparent"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Supervisor Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		id: "actions",
		header: "Edit",
		cell: ({ row }) => {
			const supervisor = row.original;
			return (
				<Button asChild size="sm">
					<a href={`/seteam/admin/wt/supervisors/${supervisor._id}`}>Edit</a>
				</Button>
			);
		},
	},
];
