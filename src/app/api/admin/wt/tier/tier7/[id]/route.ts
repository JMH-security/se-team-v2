// app/api/tier7/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier7 from "@/models/tiers/Tier7";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier7 = await Tier7.findById(prm.id);
	if (!tier7) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier7);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const tier7 = await Tier7.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!tier7) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier7);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier7 = await Tier7.findByIdAndDelete(prm.id);
	if (!tier7) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
