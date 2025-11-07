// app/api/tier4/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier4 from "@/models/tiers/Tier4";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier4 = await Tier4.findById(prm.id);
	if (!tier4) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier4);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const tier4 = await Tier4.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!tier4) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(tier4);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const tier4 = await Tier4.findByIdAndDelete(prm.id);
	if (!tier4) return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
