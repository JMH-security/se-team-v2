// app/api/tier3/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier3 from "@/models/tiers/Tier3";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier3 = await Tier3.findById(prm.id);
	if (!tier3) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier3);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const tier3 = await Tier3.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!tier3) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier3);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier3 = await Tier3.findByIdAndDelete(prm.id);
	if (!tier3) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
