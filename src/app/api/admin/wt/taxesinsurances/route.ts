// app/api/admin/wt/taxesinsurances/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TaxesInsurance from "@/models/TaxesInsurance";

export async function GET() {
	await dbConnect();
	const taxesInsurances = await TaxesInsurance.find({});
	return NextResponse.json(taxesInsurances);
}

export async function POST(request: Request) {
	await dbConnect();
	const data = await request.json();
	const taxesInsurances = await TaxesInsurance.create(data);
	return NextResponse.json(taxesInsurances, { status: 201 });
}
