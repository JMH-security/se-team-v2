// app/api/admin/wt/tier6/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier6 from "@/models/tiers/Tier6";

export async function GET() {
	await dbConnect();
	const tier6s = await Tier6.find({});
	return NextResponse.json(tier6s);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const tier6s = await Tier6.create(data);
	return NextResponse.json(tier6s, { status: 201 });
}
