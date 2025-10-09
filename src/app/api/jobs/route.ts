import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import JobModel from "@/models/Job";
import { jobFormSchema } from "@/lib/formSchemas/jobSchema";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
	try {
		await connectDB();
		const jobs = await JobModel.find({});
		return NextResponse.json(jobs);
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch jobs" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		await connectDB();
		const body = await request.json();
		const parsed = jobFormSchema.parse({ ...body, JobId: uuidv4() });
		const job = new JobModel(parsed);
		await job.save();
		console.log("Job created:", job);
		return NextResponse.json(job, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to create job" },
			{ status: 400 }
		);
	}
}
