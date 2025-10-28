// app/api/taxesInsurances/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TaxesInsurance from "@/models/TaxesInsurance";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const taxesInsurance = await TaxesInsurance.findById(prm.id);
	if (!taxesInsurance)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(taxesInsurance);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const taxesInsurance = await TaxesInsurance.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!taxesInsurance)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(taxesInsurance);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const taxesInsurance = await TaxesInsurance.findByIdAndDelete(prm.id);
	if (!taxesInsurance)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
