// app/api/admin/wt/tier3/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier3 from "@/models/tiers/Tier3";

export async function GET() {
	await dbConnect();
	const tier3s = await Tier3.find({});
	return NextResponse.json(tier3s);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const tier3s = await Tier3.create(data);
	return NextResponse.json(tier3s, { status: 201 });
}
