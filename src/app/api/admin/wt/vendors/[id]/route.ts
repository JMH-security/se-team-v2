import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vendor from "@/models/Vendor";
import { vendorSchema } from "@/lib/schemas/vendorSchema";

// GET single vendor by ID
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect();
		const { id } = await params;
		const vendor = await Vendor.findById(id);

		if (!vendor) {
			return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
		}

		return NextResponse.json(vendor);
	} catch (error) {
		console.error("Error fetching vendor:", error);
		return NextResponse.json(
			{ error: "Failed to fetch vendor" },
			{ status: 500 }
		);
	}
}

// PUT update vendor by ID
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect();
		const { id } = await params;
		const data = await request.json();

		// Validate the data
		const validationResult = vendorSchema.safeParse(data);
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: "Validation failed", details: validationResult.error.errors },
				{ status: 400 }
			);
		}

		const vendor = await Vendor.findByIdAndUpdate(id, validationResult.data, {
			new: true,
			runValidators: true,
		});

		if (!vendor) {
			return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
		}

		return NextResponse.json(vendor);
	} catch (error) {
		console.error("Error updating vendor:", error);
		return NextResponse.json(
			{ error: "Failed to update vendor" },
			{ status: 500 }
		);
	}
}

// DELETE vendor by ID
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect();
		const { id } = await params;
		const vendor = await Vendor.findByIdAndDelete(id);

		if (!vendor) {
			return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Vendor deleted successfully" });
	} catch (error) {
		console.error("Error deleting vendor:", error);
		return NextResponse.json(
			{ error: "Failed to delete vendor" },
			{ status: 500 }
		);
	}
}
