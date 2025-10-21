// app/api/supervisors/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Supervisor from "@/models/Supervisor";

export async function GET() {
	await dbConnect();
	const supervisors = await Supervisor.find({});
	return NextResponse.json(supervisors);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const supervisor = await Supervisor.create(data);
	return NextResponse.json(supervisor, { status: 201 });
}
