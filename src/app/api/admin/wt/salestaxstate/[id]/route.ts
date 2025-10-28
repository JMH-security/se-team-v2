// app/api/salesTaxStates/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SalesTaxState from "@/models/Salestaxstate";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const salesTaxState = await SalesTaxState.findById(prm.id);
	if (!salesTaxState)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(salesTaxState);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const data = await request.json();
	const prm = await params;
	const salesTaxState = await SalesTaxState.findByIdAndUpdate(prm.id, data, {
		new: true,
	});
	if (!salesTaxState)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json(salesTaxState);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect();
	const prm = await params;
	const salesTaxState = await SalesTaxState.findByIdAndDelete(prm.id);
	if (!salesTaxState)
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	return NextResponse.json({ message: "Deleted" });
}
