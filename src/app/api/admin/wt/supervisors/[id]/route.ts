// app/api/supervisors/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Supervisor from "@/models/Supervisor";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const supervisor = await Supervisor.findById(params.id);
	if (!supervisor)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(supervisor);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const ps = await params;
	const supervisor = await Supervisor.findByIdAndUpdate(ps.id, data, {
		new: true,
	});
	if (!supervisor)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(supervisor);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const ps = await params;
	const supervisor = await Supervisor.findByIdAndDelete(ps.id);
	if (!supervisor)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
