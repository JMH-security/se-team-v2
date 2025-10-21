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
					variant="ghost"
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
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Supervisor Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		id: "edit",
		header: "Edit",
		cell: ({ row }) => {
			const supervisor = row.original;
			return (
				<Button asChild size="sm" className="min-w-[60px]">
					<a href={`/seteam/admin/wt/supervisors/${supervisor._id}`}>Edit</a>
				</Button>
			);
		},
	},
	{
		id: "delete",
		header: "Delete",
		cell: ({ row }) => {
			const supervisor = row.original;
			const handleDelete = async (id: string) => {
				if (!confirm("Are you sure you want to delete this supervisor?")) {
					return;
				}
				try {
					const response = await fetch(`/api/admin/wt/supervisors/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) {
						throw new Error("Failed to delete supervisor");
					}
					// Optionally, you can add a callback here to refresh the list after deletion
					alert("Supervisor deleted successfully");
					//Router.refresh();
				} catch (error) {
					console.error("Error deleting supervisor:", error);
					alert("Error deleting supervisor");
				}
			};
			return (
				<Button
					size="sm"
					variant="destructive"
					className="min-w-[60px]"
					onClick={() => {
						handleDelete(supervisor._id);
					}}
				>
					Delete
				</Button>
			);
		},
	},
	{
		accessorKey: "_id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Supervisor UUID
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];
