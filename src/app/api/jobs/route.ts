import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AddJob from "@/models/AddJob";
import { addJobSchema } from "@/lib/schemas/addJobSchema";
import { addCounterIndex } from "@/helpers/counterHelper";
import { ICounter } from "@/types/counter";

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
		const body: ICounter = await request.json();
		const newJob = await addCounterIndex();
		const newJobNumber = newJob.prefix + newJob.index.toString();
		const parsed = addJobSchema.parse({ ...body, jobNumber: newJobNumber });
		const job = new AddJob(parsed);
		await job.save();
		return NextResponse.json(job, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to create job" },
			{ status: 400 }
		);
	}
}
