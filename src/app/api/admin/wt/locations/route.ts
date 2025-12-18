// app/api/locations/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Location from "@/models/Location";

export async function GET() {
	await dbConnect();
	const locations = await Location.find({});
	return NextResponse.json(locations);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const location = await Location.create(data);
	return NextResponse.json(location, { status: 201 });
}
