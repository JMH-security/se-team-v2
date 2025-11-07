import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AddJob from "@/models/AddJob";
// import { jobFormSchema } from "@/lib/formSchemas/jobSchema";
import { addJobSchema } from "@/lib/schemas/addJobSchema";
// import { v4 as uuidv4 } from "uuid";

export async function GET() {
	try {
		await connectDB();
		const jobs = await AddJob.find({});
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
		console.log("In the API POST Route body:", body);
		const parsed = addJobSchema.parse({ ...body });
		//const parsed = addJobSchema.parse({ ...body, JobId: uuidv4() });
		const job = new AddJob(parsed);
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
