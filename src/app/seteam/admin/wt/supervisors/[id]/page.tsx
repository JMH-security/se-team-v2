import connectDB from "@/lib/db";
import SupervisorEditForm from "@/components/wt/SupervisorEditForm";
import { Supervisor } from "@/types/supervisor";

async function getSupervisor(id: string): Promise<Supervisor | null> {
	await connectDB();
	const SupervisorModel = (await import("@/models/Supervisor")).default;
	const res = await SupervisorModel.findById(id).lean();
	return res as unknown as Supervisor | null;
}

export default async function SupervisorEditPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;
	const supervisor = await getSupervisor(id);

	const simpleSupervisor = JSON.stringify(supervisor);
	if (!supervisor) {
		return (
			<div className="p-6 max-w-[800px] mx-auto bg-accent">
				<h1 className="text-2xl font-bold mb-6">Supervisor not found</h1>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-[800px] mx-auto bg-accent">
			<h1 className="text-2xl font-bold mb-6">Edit The Supervisor</h1>

			<SupervisorEditForm simpleSupervisor={simpleSupervisor} />
		</div>
	);
}
