// app/api/tier6/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier6 from "@/models/tiers/Tier6";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier6 = await Tier6.findById(prm.id);
	if (!tier6) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier6);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const tier6 = await Tier6.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!tier6) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier6);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier6 = await Tier6.findByIdAndDelete(prm.id);
	if (!tier6) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
