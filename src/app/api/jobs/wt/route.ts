import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/Job";
import { jobFormSchema } from "@/lib/formSchemas/jobSchema";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
	try {
		await connectDB();
		const jobs = await Job.find({});
		return NextResponse.json(jobs);
	} catch (error) {
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
		//console.log("Body data", body);
		const parsed = jobFormSchema.parse(body);
		parsed.jobId = uuidv4();
		const job = new Job(parsed);
		const addJob = await job.save();

		if (addJob) {
			return NextResponse.json(addJob, { status: 201 });
		} else {
			return NextResponse.json(
				{ error: "Failed to create job" },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error("This is a problem: ", error);
		return NextResponse.json(
			{ error: "Failed to create job" },
			{ status: 400 }
		);
	}
}
