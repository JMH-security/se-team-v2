// app/api/admin/wt/jobPayrollTaxStates/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import JobPayrollTaxState from "@/models/JobPayrollTaxState";

export async function GET() {
	await dbConnect();
	const jobPayrollTaxStates = await JobPayrollTaxState.find({});
	return NextResponse.json(jobPayrollTaxStates);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const jobPayrollTaxStates = await JobPayrollTaxState.create(data);
	return NextResponse.json(jobPayrollTaxStates, { status: 201 });
}
