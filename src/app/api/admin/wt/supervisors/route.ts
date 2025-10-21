import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Supervisor from "@/models/Supervisor";
import { supervisorSchema } from "@/lib/schemas/supervisorSchema";

export async function GET() {
	try {
		await connectDB();

		const supervisors = await Supervisor.find().lean();
		console.log("api fetch", supervisors);
		if (!supervisors) {
			return NextResponse.json(
				{ message: "No supervisors found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(supervisors, { status: 200 });
	} catch (error) {
		console.error("GET error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		await connectDB();
		const data = await request.json();
		console.log("POST data:", data);
		const parsed = supervisorSchema.parse(data);
		const supervisor = new Supervisor(parsed);
		await supervisor.save();
		return NextResponse.json(supervisor, { status: 201 });
	} catch (error) {
		console.error("Error:", error);
		// If it's a Zod validation error, return 400 with issues
		if (typeof error === "object" && error !== null && "issues" in error) {
			return NextResponse.json(
				{
					error: "Validation error",
					details: (error as { issues?: unknown }).issues,
				},
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
