import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { PTORequest, PTORequestLog } from "@/models/PTORequest";
import { ptoApprovalSchema } from "@/lib/schemas/ptoSchema";
import { auth } from "@/lib/auth";
import User from "@/models/User";

// GET single PTO request
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect();
		const session = await auth();
		const { id } = await params;

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const ptoRequest = await PTORequest.findById(id);

		if (!ptoRequest) {
			return NextResponse.json(
				{ error: "PTO request not found" },
				{ status: 404 }
			);
		}

		// Check if user can view this request
		const user = await User.findOne({ email: session.user.email });
		const isAdmin = user?.role === "admin" || user?.role === "super-admin";

		if (!isAdmin && ptoRequest.userEmail !== session.user.email) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		return NextResponse.json(ptoRequest);
	} catch (error) {
		console.error("Error fetching PTO request:", error);
		return NextResponse.json(
			{ error: "Failed to fetch PTO request" },
			{ status: 500 }
		);
	}
}

// PATCH - Approve or deny PTO request (admin only)
export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect();
		const session = await auth();
		const { id } = await params;

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Check if user is admin
		const user = await User.findOne({ email: session.user.email });
		const isAdmin = user?.role === "admin" || user?.role === "super-admin";

		if (!isAdmin) {
			return NextResponse.json(
				{ error: "Only administrators can approve/deny PTO requests" },
				{ status: 403 }
			);
		}

		const data = await request.json();

		// Validate approval data
		const validationResult = ptoApprovalSchema.safeParse(data);
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: "Validation failed", details: validationResult.error.errors },
				{ status: 400 }
			);
		}

		const ptoRequest = await PTORequest.findById(id);

		if (!ptoRequest) {
			return NextResponse.json(
				{ error: "PTO request not found" },
				{ status: 404 }
			);
		}

		// Don't allow changing already processed requests
		if (ptoRequest.status !== "pending") {
			return NextResponse.json(
				{ error: "This PTO request has already been processed" },
				{ status: 400 }
			);
		}

		// Update the request
		const updatedRequest = await PTORequest.findByIdAndUpdate(
			id,
			{
				status: validationResult.data.status,
				reviewedBy: session.user.email,
				reviewedByName: session.user.name || session.user.email,
				reviewedAt: new Date(),
				reviewNotes: validationResult.data.reviewNotes,
			},
			{ new: true }
		);

		// Log the action
		await PTORequestLog.create({
			ptoRequestId: id,
			action: validationResult.data.status,
			performedBy: session.user.email,
			performedByName: session.user.name || session.user.email,
			performedByEmail: session.user.email,
			details: validationResult.data.reviewNotes || `Request ${validationResult.data.status}`,
		});

		return NextResponse.json(updatedRequest);
	} catch (error) {
		console.error("Error updating PTO request:", error);
		return NextResponse.json(
			{ error: "Failed to update PTO request" },
			{ status: 500 }
		);
	}
}

// DELETE PTO request (user can delete their own pending requests)
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await dbConnect();
		const session = await auth();
		const { id } = await params;

		if (!session?.user?.email) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const ptoRequest = await PTORequest.findById(id);

		if (!ptoRequest) {
			return NextResponse.json(
				{ error: "PTO request not found" },
				{ status: 404 }
			);
		}

		// Check if user owns this request
		if (ptoRequest.userEmail !== session.user.email) {
			const user = await User.findOne({ email: session.user.email });
			const isAdmin = user?.role === "admin" || user?.role === "super-admin";
			if (!isAdmin) {
				return NextResponse.json({ error: "Forbidden" }, { status: 403 });
			}
		}

		// Only allow deleting pending requests (unless admin)
		const user = await User.findOne({ email: session.user.email });
		const isAdmin = user?.role === "admin" || user?.role === "super-admin";

		if (ptoRequest.status !== "pending" && !isAdmin) {
			return NextResponse.json(
				{ error: "Can only delete pending requests" },
				{ status: 400 }
			);
		}

		await PTORequest.findByIdAndDelete(id);

		// Log the deletion
		await PTORequestLog.create({
			ptoRequestId: id,
			action: "updated",
			performedBy: session.user.email,
			performedByName: session.user.name || session.user.email,
			performedByEmail: session.user.email,
			details: "PTO request deleted",
		});

		return NextResponse.json({ message: "PTO request deleted" });
	} catch (error) {
		console.error("Error deleting PTO request:", error);
		return NextResponse.json(
			{ error: "Failed to delete PTO request" },
			{ status: 500 }
		);
	}
}
