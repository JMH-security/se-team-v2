// app/api/tier1/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier1 from "@/models/tiers/Tier1";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier1 = await Tier1.findById(prm.id);
	if (!tier1) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier1);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const tier1 = await Tier1.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!tier1) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier1);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier1 = await Tier1.findByIdAndDelete(prm.id);
	if (!tier1) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
