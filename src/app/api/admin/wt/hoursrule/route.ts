// app/api/admin/wt/hoursRules/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HoursRule from "@/models/HoursRule";

export async function GET() {
	await dbConnect();
	const hoursRules = await HoursRule.find({});
	return NextResponse.json(hoursRules);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const hoursRules = await HoursRule.create(data);
	return NextResponse.json(hoursRules, { status: 201 });
}
