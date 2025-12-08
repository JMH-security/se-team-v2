import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AddJob from "@/models/AddJob";
import CustomerJobs from "@/models/CustomerJobs";
import { addJobSchema } from "@/lib/schemas/addJobSchema";
import { customerJobsSchema } from "@/lib/schemas/customerJobs";
import { addCounterIndex } from "@/helpers/counterHelper";
import { ICounter } from "@/types/counter";
import { TAddJob } from "@/types/addJob";

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
		const body: TAddJob = await request.json();

		// Generate the next job number
		const newJob: ICounter = await addCounterIndex();
		const newJobNumber = newJob.prefix + newJob.index.toString();

		const parsed = addJobSchema.parse({ ...body, jobNumber: newJobNumber });
		const job = new AddJob(parsed);
		const mgoJobAdd = await job.save();
		console.log("Saved Job to MongoDB:", mgoJobAdd);

		//*****GET CUSTOMER DETAILS */
		const cjIdValue = mgoJobAdd.customFields.find(
			(field: any) => field.fieldNumber === 2
		)?.value;
		const customerToAddJob = cjIdValue
			? await CustomerJobs.findOne({ customerId: cjIdValue })
			: null;
		console.log("Customer to add job to:", customerToAddJob);
		if (customerToAddJob) {
			customerToAddJob.customerJobsList.push({
				jobId: mgoJobAdd._id.toString(),
				jobNumber: mgoJobAdd.jobNumber,
			});
			const updatedCustWithJobs = await customerToAddJob.save();
			console.log(updatedCustWithJobs);
		}

		// const customerJobs = await CustomerJobs.create(data);

		// **************** Prepare the job object to send to WinTeam ****************

		// Remove IDs from tiers
		const wtAddTiers = mgoJobAdd.jobTiers.map(
			(tier: TWtJobTier, i: number) => ({
				tierID: i + 1,
				tierValue: tier.tierValue,
				tierValueDescription: tier.tierValueDescription,
			})
		);
		// Remove IDs from custom fields
		const wtAddCustomFields = mgoJobAdd.customFields.map((field: any) => ({
			fieldNumber: field.fieldNumber + 10, // Get rid of +10 for production
			value: field.value,
		}));

		// Build the winTeam object
		const wtJobToAdd = {} as any;
		wtJobToAdd.TaxAddress = {};
		wtJobToAdd.TaxAddress.Address1 = mgoJobAdd.address.jobAddress1;
		wtJobToAdd.TaxAddress.Address2 = mgoJobAdd.address.jobAddress2;
		wtJobToAdd.TaxAddress.City = mgoJobAdd.address.jobCity;
		wtJobToAdd.TaxAddress.State = mgoJobAdd.address.jobState;
		wtJobToAdd.TaxAddress.Zip = Number(mgoJobAdd.address.jobZip);
		wtJobToAdd.JobNumber = mgoJobAdd.jobNumber;
		wtJobToAdd.JobDescription = mgoJobAdd.jobDescription;
		wtJobToAdd.LocationId = 210;
		wtJobToAdd.CompanyNumber = 1;
		wtJobToAdd.Address = mgoJobAdd.address;
		wtJobToAdd.Address.Zip = Number(mgoJobAdd.address.jobZip);
		wtJobToAdd.JobAttention = mgoJobAdd.jobAttention;
		wtJobToAdd.TypeId = mgoJobAdd.typeId;
		wtJobToAdd.SupervisorId = mgoJobAdd.supervisorId;
		wtJobToAdd.SalesTaxStateId = mgoJobAdd.salesTaxStateId;
		wtJobToAdd.JobPayrollTaxStateId = mgoJobAdd.jobPayrollTaxStateId;
		wtJobToAdd.HoursCategoryId = mgoJobAdd.hoursCategoryId;
		wtJobToAdd.JobTiers = wtAddTiers;
		wtJobToAdd.TaxesInsuranceId = mgoJobAdd.taxesInsuranceId;
		wtJobToAdd.CustomFields = wtAddCustomFields;
		wtJobToAdd.IsAvalaraClient = false;
		wtJobToAdd.HoursRuleId = mgoJobAdd.hoursRuleId;
		wtJobToAdd.TimeKeepingJob = false;
		wtJobToAdd.TimeSheetTypeId = 1;
		wtJobToAdd.HoursCategoryId = mgoJobAdd.hoursCategoryId;

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
					}
				);

				const fetchedJob: WTApiResponse = await res2.json();
				const fetchedJobData = fetchedJob.data[0].results[0];
				const wtJobID = fetchedJob.data[0].results[0].jobId;
				// Update MongoDB with WinTeam JobID
				const jobUpdate = await AddJob.updateOne(
					{ jobNumber: mgoJobAdd.jobNumber },
					{ $set: { jobId: wtJobID } }
				);
				console.log("Updated MongoDB with WinTeam JobID:", jobUpdate);
				return NextResponse.json(fetchedJobData, { status: 201 });
			}
		} else {
			return NextResponse.json(
				{ error: "Failed to Compose Job" },
				{ status: 400 }
			);
		}

		// console.log("Job added to MongoDB:", wtAddTiers);
		// console.log("Updated Job to send to WT:", wtJobToAdd);
		// return NextResponse.json(wtJobToAdd, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to create job" },
			{ status: 400 }
		);
	}
}
