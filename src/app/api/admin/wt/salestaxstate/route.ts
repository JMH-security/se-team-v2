// app/api/admin/wt/salesTaxStates/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SalesTaxState from "@/models/Salestaxstate";

export async function GET() {
	await dbConnect();
	const salesTaxStates = await SalesTaxState.find({});
	return NextResponse.json(salesTaxStates);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	console.log("POST data received:", data);
	const salesTaxStates = await SalesTaxState.create(data);
	return NextResponse.json(salesTaxStates, { status: 201 });
}
