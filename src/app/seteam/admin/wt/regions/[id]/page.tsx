import connectDB from "@/lib/db";
import RegionForm from "@/components/RegionForm";
import { Region } from "@/lib/types";

async function getRegion(id: string) {
	await connectDB();
	const Region = (await import("@/models/Region_archive")).default;
	return Region.findById(id).lean();
}

export default async function RegionEditPage({
	params,
}: {
	params: { id: string };
}) {
	const region = await getRegion(params.id);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Edit Region</h1>
			<RegionForm initialData={region as Region} />
		</div>
	);
}
