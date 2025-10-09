import connectDB from "@/lib/db";
import SupervisorForm from "@/components/SupervisorForm";
import { Supervisor } from "@/lib/types";

async function getSupervisor(id: string) {
	await connectDB();
	const Supervisor = (await import("@/models/Supervisor_archive")).default;
	return Supervisor.findById(id).lean();
}

export default async function SupervisorEditPage({
	params,
}: {
	params: { id: string };
}) {
	const supervisor = await getSupervisor(params.id);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Edit Supervisor</h1>
			<SupervisorForm initialData={supervisor as Supervisor} />
		</div>
	);
}
