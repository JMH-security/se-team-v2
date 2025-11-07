// app/api/admin/wt/tier5/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier5 from "@/models/tiers/Tier5";

export async function GET() {
	await dbConnect();
	const tier5s = await Tier5.find({});
	return NextResponse.json(tier5s);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const tier5s = await Tier5.create(data);
	return NextResponse.json(tier5s, { status: 201 });
}
