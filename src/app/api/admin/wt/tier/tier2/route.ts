// app/api/admin/wt/tier2/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier2 from "@/models/tiers/Tier2";

export async function GET() {
	await dbConnect();
	const tier2s = await Tier2.find({});
	return NextResponse.json(tier2s);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const tier2s = await Tier2.create(data);
	return NextResponse.json(tier2s, { status: 201 });
}
