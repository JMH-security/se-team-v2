// app/api/jobPayrollTaxStates/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import JobPayrollTaxState from "@/models/JobPayrollTaxState";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const jobPayrollTaxState = await JobPayrollTaxState.findById(prm.id);
	if (!jobPayrollTaxState)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(jobPayrollTaxState);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const jobPayrollTaxState = await JobPayrollTaxState.findByIdAndUpdate(
		prm.id,
		data,
		{
			new: true,
		}
	);
	if (!jobPayrollTaxState)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(jobPayrollTaxState);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const jobPayrollTaxState = await JobPayrollTaxState.findByIdAndDelete(prm.id);
	if (!jobPayrollTaxState)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
