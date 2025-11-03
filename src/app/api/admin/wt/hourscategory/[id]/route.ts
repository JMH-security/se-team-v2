// app/api/hoursCategory/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HoursCategory from "@/models/HoursCategory";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const hoursCategory = await HoursCategory.findById(prm.id);
	if (!hoursCategory)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(hoursCategory);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const hoursCategory = await HoursCategory.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!hoursCategory)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(hoursCategory);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const hoursCategory = await HoursCategory.findByIdAndDelete(prm.id);
	if (!hoursCategory)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
