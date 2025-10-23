// app/api/regions/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Region from "@/models/Region";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const region = await Region.findById(prm.id);
	if (!region)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(region);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const region = await Region.findByIdAndUpdate(prm.id, data, { new: true });
	if (!region)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(region);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const region = await Region.findByIdAndDelete(prm.id);
	if (!region)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
