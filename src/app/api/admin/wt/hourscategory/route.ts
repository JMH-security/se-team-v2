// app/api/admin/wt/hoursCategory/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HoursCategory from "@/models/HoursCategory";

export async function GET() {
	await dbConnect();
	const hoursCategorys = await HoursCategory.find({});
	return NextResponse.json(hoursCategorys);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const hoursCategorys = await HoursCategory.create(data);
	return NextResponse.json(hoursCategorys, { status: 201 });
}
