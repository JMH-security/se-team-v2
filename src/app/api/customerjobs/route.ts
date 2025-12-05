// app/api/customerJobs/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import CustomerJobs from "@/models/CustomerJobs";

export async function GET() {
	await dbConnect();
	const customerJobs = await CustomerJobs.find({});
	return NextResponse.json(customerJobs);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const customerJobs = await CustomerJobs.create(data);
	return NextResponse.json(customerJobs, { status: 201 });
}
