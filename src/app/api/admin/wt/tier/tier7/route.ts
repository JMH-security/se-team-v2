// app/api/admin/wt/tier7/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier7 from "@/models/tiers/Tier7";

export async function GET() {
	await dbConnect();
	const tier7s = await Tier7.find({});
	return NextResponse.json(tier7s);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const tier7s = await Tier7.create(data);
	return NextResponse.json(tier7s, { status: 201 });
}
