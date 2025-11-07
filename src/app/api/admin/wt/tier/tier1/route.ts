// app/api/admin/wt/tier1/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier1 from "@/models/tiers/Tier1";

export async function GET() {
	await dbConnect();
	const tier1s = await Tier1.find({});
	return NextResponse.json(tier1s);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const tier1s = await Tier1.create(data);
	return NextResponse.json(tier1s, { status: 201 });
}
