import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import LocalJob from "@/models/LocalJob";
import CustomerJobs from "@/models/CustomerJobs";
import { localJobSchema } from "@/lib/schemas/localJobSchema";
import { addCounterIndex } from "@/helpers/counterHelper";
import { ICounter } from "@/types/counter";
import { TLocalJob } from "@/types/localJob";

interface TWtJobTier {
	tierValue?: string;
	tierValueDescription?: string;
}

interface WTApiResponse {
	success: boolean;
	data?: any;
	jobNumber?: string;
	error?: string;
}

export async function GET() {
	try {
		await connectDB();
		const jobs = await LocalJob.find({});
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
		const body: TLocalJob = await request.json();

		// Generate the next job number
		console.log("THe body received:", body);

		if (body.jobNumber == "" || !body.jobNumber) {
			const newJob: ICounter = await addCounterIndex();
			const newJobNumber = newJob.prefix + newJob.index.toString();
			body.jobNumber = newJobNumber;
		}
		console.log("Job number assigned:", body.jobNumber);
		const parsed = localJobSchema.parse({ ...body });

		console.log("Parsed Job Data:", parsed);
		console.log("Composing new Job...");
		// Remove _id if it's empty or undefined - let MongoDB auto-generate it
		const { _id, ...jobData } = parsed;
		const job = new LocalJob(jobData);
		console.log("New Job Instance to save....", job);
		const mgoLocalJob = await job.save();
		console.log("Saved Job to MongoDB:", mgoLocalJob);

		//*****GET CUSTOMER DETAILS */
		const cjIdValue = mgoLocalJob.customFields.find(
			(field: any) => field.fieldNumber === 2
		)?.value;
		const customerToAddJob = cjIdValue
			? await CustomerJobs.findOne({ customerId: cjIdValue })
			: null;
		console.log("Customer to add job to:", customerToAddJob);
		if (customerToAddJob) {
			customerToAddJob.customerJobsList.push({
				jobId: mgoLocalJob._id.toString(),
				jobNumber: mgoLocalJob.jobNumber,
			});
			const updatedCustWithJobs = await customerToAddJob.save();
			console.log(updatedCustWithJobs);
		}
		return NextResponse.json(mgoLocalJob, { status: 201 });
	} catch (error) {
		console.error("Full error details:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json(
			{ error: "Failed to Compose Job", details: errorMessage },
			{ status: 400 }
		);
	}
}
