import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { PTORequest, PTORequestLog } from "@/models/PTORequest";
import { ptoRequestSchema } from "@/lib/schemas/ptoSchema";
import { auth } from "@/lib/auth";
import User from "@/models/User";

// GET all PTO requests (for admin) or user's own requests
export async function GET(request: Request) {
	try {
		await dbConnect();
		const session = await auth();

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get user role
		const user = await User.findOne({ email: session.user.email });
		const isAdmin = user?.role === "admin" || user?.role === "super-admin";

		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status");
		const all = searchParams.get("all") === "true";

		let query: Record<string, unknown> = {};

		// If not admin or not requesting all, only show user's own requests
		if (!isAdmin || !all) {
			query.userEmail = session.user.email;
		}

		// Filter by status if provided
		if (status && ["pending", "approved", "denied"].includes(status)) {
			query.status = status;
		}

		const ptoRequests = await PTORequest.find(query).sort({ createdAt: -1 });
		return NextResponse.json(ptoRequests);
	} catch (error) {
		console.error("Error fetching PTO requests:", error);
		return NextResponse.json(
			{ error: "Failed to fetch PTO requests" },
			{ status: 500 }
		);
	}
}

// POST create new PTO request
export async function POST(request: Request) {
	try {
		await dbConnect();
		const session = await auth();

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await request.json();

		// Validate the data
		const validationResult = ptoRequestSchema.safeParse(data);
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: "Validation failed", details: validationResult.error.errors },
				{ status: 400 }
			);
		}

		// Ensure the request is for the current user
		if (validationResult.data.userEmail !== session.user.email) {
			return NextResponse.json(
				{ error: "Cannot create PTO request for another user" },
				{ status: 403 }
			);
		}

		// Remove _id to let MongoDB generate one
		const { _id, ...ptoData } = validationResult.data;

		// Create PTO request
		const ptoRequest = await PTORequest.create({
			...ptoData,
			status: "pending",
		});

		// Log the creation
		await PTORequestLog.create({
			ptoRequestId: ptoRequest._id,
			action: "created",
			performedBy: session.user.email,
			performedByName: session.user.name || session.user.email,
			performedByEmail: session.user.email,
			details: `PTO request created for ${ptoData.totalHours} hours from ${ptoData.startDate} to ${ptoData.endDate}`,
		});

		return NextResponse.json(ptoRequest, { status: 201 });
	} catch (error) {
		console.error("Error creating PTO request:", error);
		return NextResponse.json(
			{ error: "Failed to create PTO request" },
			{ status: 500 }
		);
	}
}
