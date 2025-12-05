// app/api/customerJobs/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import CustomerJobs from "@/models/CustomerJobs";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const customerJobs = await CustomerJobs.findById(prm.id);
	if (!customerJobs)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(customerJobs);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const customerJobs = await CustomerJobs.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!customerJobs)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(customerJobs);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const customerJobs = await CustomerJobs.findByIdAndDelete(prm.id);
	if (!customerJobs)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
