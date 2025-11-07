// app/api/tier2/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier2 from "@/models/tiers/Tier2";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier2 = await Tier2.findById(prm.id);
	if (!tier2) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier2);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const tier2 = await Tier2.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!tier2) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier2);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier2 = await Tier2.findByIdAndDelete(prm.id);
	if (!tier2) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
