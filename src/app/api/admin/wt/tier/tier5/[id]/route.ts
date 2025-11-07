// app/api/tier5/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier5 from "@/models/tiers/Tier5";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier5 = await Tier5.findById(prm.id);
	if (!tier5) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier5);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const tier5 = await Tier5.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!tier5) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier5);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier5 = await Tier5.findByIdAndDelete(prm.id);
	if (!tier5) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
