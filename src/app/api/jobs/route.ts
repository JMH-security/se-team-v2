import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AddJob from "@/models/AddJob";
import { addJobSchema } from "@/lib/schemas/addJobSchema";
import { addCounterIndex } from "@/helpers/counterHelper";
import { ICounter } from "@/types/counter";

interface TWtJobTier {
	tierValue?: string;
	tierValueDescription?: string;
}

interface WTApiResponse {
	success: boolean;
	data?: any;
	error?: string;
}

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

		// Generate the next job number
		const newJob = await addCounterIndex();
		const newJobNumber = newJob.prefix + newJob.index.toString();

		const parsed = addJobSchema.parse({ ...body, jobNumber: newJobNumber });
		const job = new AddJob(parsed);
		const mgoJobAdd = await job.save();

		// **************** Prepare the job object to send to WinTeam ****************
		const wtJobToAdd = mgoJobAdd.toObject();
		wtJobToAdd.jobId = mgoJobAdd._id.toString();
		// Remove IDs from tiers
		const wtAddTiers = mgoJobAdd.jobTiers.map((tier: TWtJobTier) => ({
			tierValue: tier.tierValue,
			tierValueDescription: tier.tierValueDescription,
		}));
		wtJobToAdd.jobTiers = wtAddTiers;

		// if (status) {
		// 	console.log("SENDING JOB TO WINTEAM...");
		// 	const tempBody = JSON.stringify(status);
		// 	console.log("JOB BODY OBJECT:", tempBody);

		// 	const headerValues = {
		// 		"Ocp-apim-subscription-key": process.env.WT_SUB_KEY || "",
		// 		TenantID: process.env.WT_TENANT_DEV_ID || "",
		// 	};

		// 	const res = await fetch(`${process.env.NXT_JOB_URL}`, {
		// 		method: "POST",
		// 		headers: headerValues,
		// 		body: JSON.stringify(status),
		// 	});

		// 	if (!res.ok) {
		// 		const error = await res.text();
		// 		throw new Error(`WinTeam API error: ${res.status} - ${error}`);
		// 	} else {
		// 		const addedJob: WTApiResponse = await res.json();
		// 		console.log("WinTeam API response status:", addedJob);
		// 		return NextResponse.json(addedJob, { status: 201 });
		// 	}
		// } else {
		// 	return NextResponse.json(
		// 		{ error: "Failed to Compose Job" },
		// 		{ status: 400 }
		// 	);
		// }
		console.log("Job added to MongoDB:", wtAddTiers);
		console.log("Updated Job to send to WT:", wtJobToAdd);
		return NextResponse.json(wtJobToAdd, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to create job" },
			{ status: 400 }
		);
	}
}
