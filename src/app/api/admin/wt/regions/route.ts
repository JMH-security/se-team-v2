// app/api/regions/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Region from "@/models/Region";

export async function GET() {
	await dbConnect();
	const regions = await Region.find({});
	return NextResponse.json(regions);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const region = await Region.create(data);
	return NextResponse.json(region, { status: 201 });
}
