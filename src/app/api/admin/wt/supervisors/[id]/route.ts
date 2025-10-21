import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Supervisor from "@/models/Supervisor";

export async function PUT(request: Request) {
	await connectDB();
	const data = await request.json();
	console.log("The Put Data: ", data);
	const foundSupervisor = await Supervisor.findById(data._id);
	if (!foundSupervisor) {
		console.log("Supervisor not found with id:", data._id);
		return NextResponse.json(
			{ message: "Supervisor not found" },
			{ status: 404 }
		);
	}
	const supervisor = await Supervisor.findByIdAndUpdate(data._id, data);
	if (supervisor) {
		console.log("Supervisor updated:", supervisor);
		return NextResponse.json(supervisor);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;

	try {
		await connectDB();

		if (!id) {
			return NextResponse.json(
				{ message: "Missing id param" },
				{ status: 401 }
			);
		}

		const deleted = await Supervisor.findByIdAndDelete(id);
		if (!deleted) {
			return NextResponse.json(
				{ message: "Supervisor not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Supervisor deleted", deleted },
			{ status: 200 }
		);
	} catch (error) {
		console.error("DELETE error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
