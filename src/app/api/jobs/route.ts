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
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		await connectDB();
		const body: TLocalJob = await request.json();

		// Generate the next job number
		console.log("The formData body received:", body);

		if (body.jobNumber == "" || !body.jobNumber) {
			const newJob: ICounter = await addCounterIndex();
			const newJobNumber = newJob.prefix + newJob.index.toString();
			body.jobNumber = newJobNumber;
		}
		const parsed = localJobSchema.parse({ ...body });
		console.log("Parsed Job Data successfully");

		// Remove _id if it's empty or undefined - let MongoDB auto-generate it
		const { _id, ...jobData } = parsed;
		const job = new LocalJob(jobData);
		const mgoLocalJob = await job.save();

		//  THIS SECTION ADDED JOBLIST TO SEPARATE CUSTOMERJOBS COLLECTION - NOT IN USE
		// console.log("Saved Job to MongoDB");

		// //*****GET CUSTOMER DETAILS */
		// const cjIdValue = mgoLocalJob.customFields.find(
		// 	(field: any) => field.fieldNumber === 2,
		// )?.value;
		// const customerToAddJob = cjIdValue
		// 	? await CustomerJobs.findOne({ customerId: cjIdValue })
		// 	: null;
		// console.log("Customer to add job to:", customerToAddJob);
		// if (customerToAddJob) {
		// 	customerToAddJob.customerJobsList.push({
		// 		jobId: mgoLocalJob._id.toString(),
		// 		jobNumber: mgoLocalJob.jobNumber,
		// 	});
		// 	const updatedCustWithJobs = await customerToAddJob.save();
		// 	console.log(updatedCustWithJobs);
		//}

		// BEGIN WINTEAM ADD SECTION
		// **************** Prepare the job object to send to WinTeam ****************

		// Remove IDs from tiers
		const wtAddTiers = mgoLocalJob.jobTiers.map(
			(tier: TWtJobTier, i: number) => ({
				tierID: i + 1,
				tierValue: tier.tierValue,
				tierValueDescription: tier.tierValueDescription,
			}),
		);
		// Remove IDs from custom fields
		const wtAddCustomFields = mgoLocalJob.customFields.map((field: any) => ({
			fieldNumber: field.fieldNumber + 10, // Get rid of +10 for production
			value: field.value,
		}));

		// Build the winTeam object
		const wtJobToAdd = {} as any;
		wtJobToAdd.TaxAddress = {};
		wtJobToAdd.TaxAddress.Address1 = mgoLocalJob.address.jobAddress1;
		wtJobToAdd.TaxAddress.Address2 = mgoLocalJob.address.jobAddress2;
		wtJobToAdd.TaxAddress.City = mgoLocalJob.address.jobCity;
		wtJobToAdd.TaxAddress.State = mgoLocalJob.address.jobState;
		wtJobToAdd.TaxAddress.Zip = Number(mgoLocalJob.address.jobZip);
		// wtJobToAdd.TaxAddress.Latitude = "33.513791";
		// wtJobToAdd.TaxAddress.Longitude = "-86.811432";
		// wtJobToAdd.TaxAddress.LocationCode = "01-073-158174";
		wtJobToAdd.JobNumber = mgoLocalJob.jobNumber;
		wtJobToAdd.JobDescription = mgoLocalJob.jobDescription;
		wtJobToAdd.LocationId = 210;
		wtJobToAdd.CompanyNumber = 1;
		wtJobToAdd.Address = mgoLocalJob.address;
		wtJobToAdd.Address.Zip = Number(mgoLocalJob.address.jobZip);
		wtJobToAdd.JobAttention = mgoLocalJob.jobAttention;
		wtJobToAdd.TypeId = mgoLocalJob.typeId;
		wtJobToAdd.SupervisorId = mgoLocalJob.supervisorId;
		wtJobToAdd.SalesTaxStateId = mgoLocalJob.salesTaxStateId;
		wtJobToAdd.JobPayrollTaxStateId = mgoLocalJob.jobPayrollTaxStateId || 1;
		wtJobToAdd.HoursCategoryId = mgoLocalJob.hoursCategoryId;
		wtJobToAdd.JobTiers = wtAddTiers;
		wtJobToAdd.TaxesInsuranceId = mgoLocalJob.taxesInsuranceId;
		wtJobToAdd.CustomFields = wtAddCustomFields;
		wtJobToAdd.IsAvalaraClient = false;
		wtJobToAdd.HoursRuleId = mgoLocalJob.hoursRuleId;
		wtJobToAdd.TimeKeepingJob = false;
		wtJobToAdd.TimeSheetTypeId = 1;
		wtJobToAdd.HoursCategoryId = mgoLocalJob.hoursCategoryId;

		if (wtJobToAdd) {
			const toAddBody = JSON.stringify(wtJobToAdd);
			const headerValues = {
				"Ocp-apim-subscription-key": process.env.WT_SUB_KEY || "",
				TenantId: process.env.WT_TENANT_DEV_ID || "",
			};
			const res = await fetch(`${process.env.NXT_JOB_URL}`, {
				method: "POST",
				headers: headerValues,
				body: toAddBody,
			});

			if (!res.ok) {
				const error = await res.text();
				throw new Error(`WinTeam API error: ${res.status} - ${error}`);
			} else {
				const addedJob: WTApiResponse = await res.json();

				// Fetch jobID from WinTeam after save
				const res2 = await fetch(
					`${process.env.NXT_JOB_URL}?searchFieldName=jobNumber&searchText=${addedJob.jobNumber}`,
					{
						method: "GET",
						headers: headerValues,
					},
				);

				const fetchedJob: WTApiResponse = await res2.json();
				const fetchedJobData = fetchedJob.data[0].results[0];
				const wtJobID = fetchedJob.data[0].results[0].jobId;
				// Update MongoDB with WinTeam JobID
				const jobUpdate = await LocalJob.updateOne(
					{ jobNumber: mgoLocalJob.jobNumber },
					{ $set: { jobId: wtJobID } },
				);
				console.log("Updated MongoDB with WinTeam JobID:", jobUpdate);
				return NextResponse.json(fetchedJobData, { status: 201 });
			}
		} else {
			return NextResponse.json(
				{ error: "Failed to Compose Job" },
				{ status: 400 },
			);
		}

		// END WINTEAM ADD SECTION

		return NextResponse.json(mgoLocalJob, { status: 201 });
	} catch (error) {
		console.error("Full error details:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json(
			{ error: "Failed to Compose Job", details: errorMessage },
			{ status: 400 },
		);
	}
}
