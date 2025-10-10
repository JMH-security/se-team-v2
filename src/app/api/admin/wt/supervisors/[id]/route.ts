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
	await connectDB();
	await Supervisor.findByIdAndDelete(params.id);
	return NextResponse.json({ message: "Supervisor deleted" });
}
