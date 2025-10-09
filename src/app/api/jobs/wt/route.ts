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
		console.log("Body data", body);
		const parsed = jobFormSchema.parse({ ...body, jobId: uuidv4() });

		console.log("Parsed job data:", parsed);
		const job = new Job(parsed);
		await job.save();

		if (job) {
			try {
				const res = await fetch("http://localhost:3000/api/jobs/wt", {
					method: "POST",
					body: JSON.stringify(parsed),
				});
				if (!res.ok) {
					throw new Error(`Error: ${res.status} ${res.statusText}`);
				} else {
					return NextResponse.json(job, { status: 201 });
					console.log("Form submission successful");
				}
			} catch (error) {
				console.error("Error:", error);
				throw error; // This will trigger Next.js error boundary
			}
		}
	} catch (error) {
		console.error("This is a problem: ", error);
		return NextResponse.json(
			{ error: "Failed to create job" },
			{ status: 400 }
		);
	}
}
