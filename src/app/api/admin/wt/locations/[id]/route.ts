// app/api/locations/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Location from "@/models/Location";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const location = await Location.findById(prm.id);
	if (!location)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(location);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const location = await Location.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!location)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(location);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const location = await Location.findByIdAndDelete(prm.id);
	if (!location)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
