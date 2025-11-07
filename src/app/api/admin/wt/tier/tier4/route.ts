// app/api/admin/wt/tier4/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tier4 from "@/models/tiers/Tier4";

export async function GET() {
	await dbConnect();
	const tier4s = await Tier4.find({});
	return NextResponse.json(tier4s);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const tier4s = await Tier4.create(data);
	return NextResponse.json(tier4s, { status: 201 });
}
