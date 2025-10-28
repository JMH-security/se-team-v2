// app/api/hoursRules/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HoursRule from "@/models/HoursRule";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const hoursRule = await HoursRule.findById(prm.id);
	if (!hoursRule)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(hoursRule);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const hoursRule = await HoursRule.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!hoursRule)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(hoursRule);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const hoursRule = await HoursRule.findByIdAndDelete(prm.id);
	if (!hoursRule)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
