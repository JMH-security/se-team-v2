import { NextResponse } from "next/server";
import { Job, JobData } from "@/types/job";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET() {
	const session = await auth();
	if (!session) {
		redirect("/");
	}
	try {
		const headerValues = {
			"Ocp-apim-subscription-key": process.env.WT_SUB_KEY || "",
			TenantID: process.env.WT_TENANT_DEV_ID || "",
		};
		const res = await fetch(`${process.env.NXT_GET_ALL_JOBS}`, {
			method: "GET",
			headers: headerValues,
		});
		const wtJobs: JobData = await res.json();

		const data: Job[] = wtJobs.data[0].results;
		console.log(data[0]);

		// Collect all locationId values and keep only unique entries
		const allLocationIds = data
			.map((job: Job) => job.locationId)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueLocationIds = Array.from(new Set(allLocationIds));
		const locationIdsCount = uniqueLocationIds.length;

		// Collect all hoursRuleId values and keep only unique entries
		const allHoursRuleIds = data
			.map((job: Job) => job.hoursRuleId)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueHoursRuleIds = Array.from(new Set(allHoursRuleIds));
		const hoursRuleIdsCount = uniqueHoursRuleIds.length;
		console.log("Unique Hours Rule IDs:", uniqueHoursRuleIds);

		// Collect all hoursRuleId values and keep only unique entries
		const allTypeIds = data
			.map((job: Job) => job.typeId)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueTypeIds = Array.from(new Set(allTypeIds));
		const typeIdsCount = uniqueTypeIds.length;
		console.log("Unique Type IDs:", uniqueTypeIds);

		// Collect all supervisor IDs and keep only unique entries
		const allSupervisorIds = data
			.map((job: Job) => job.supervisorId)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueSupervisorIds = Array.from(new Set(allSupervisorIds));
		const supervisorIdsCount = uniqueSupervisorIds.length;
		console.log("Unique Supervisor IDs:", uniqueSupervisorIds);

		// Collect all TaxesInsurance IDs and keep only unique entries
		const allTaxesInsuranceIds = data
			.map((job: Job) => job.taxesInsuranceId)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueTaxesInsuranceIds = Array.from(new Set(allTaxesInsuranceIds));
		const taxesInsuranceIdsCount = uniqueTaxesInsuranceIds.length;
		console.log("Unique TaxesInsurance IDs:", uniqueTaxesInsuranceIds);

		// Collect all SalesTaxState IDs and keep only unique entries
		const allSalesTaxStateIds = data
			.map((job: Job) => job.salesTaxStateId)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueSalesTaxStateIds = Array.from(new Set(allSalesTaxStateIds));
		const salesTaxStateIdsCount = uniqueSalesTaxStateIds.length;
		console.log("Unique Sales Tax State IDs:", uniqueSalesTaxStateIds);

		// Collect all JobPayrollTaxState IDs and keep only unique entries
		const allJobPayrollTaxStateIds = data
			.map((job: Job) => job.jobPayrollTaxStateID)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueJobPayrollTaxStateIds = Array.from(
			new Set(allJobPayrollTaxStateIds)
		);
		const jobPayrollTaxStateIdsCount = uniqueJobPayrollTaxStateIds.length;
		console.log("Unique JobPayrollTaxState IDs:", uniqueJobPayrollTaxStateIds);

		// Collect all JobPayrollTaxState IDs and keep only unique entries
		const allHoursCategoryIDs = data
			.map((job: Job) => job.hoursCategoryID)
			.filter(
				(id: number | null | undefined): id is number =>
					id !== null && id !== undefined
			)
			.sort((a, b) => a - b); // Sort numerically
		const uniqueHoursCategoryIDs = Array.from(new Set(allHoursCategoryIDs));
		const hoursCategoryIDsCount = uniqueHoursCategoryIDs.length;
		console.log("Unique HoursCategory IDs:", uniqueHoursCategoryIDs);

		// Return the original WT jobs plus the computed unique locationIds
		return NextResponse.json({
			//uniqueLocationIds,
			locationIdsCount,
			//uniqueHoursRuleIds,
			hoursRuleIdsCount,
			//uniqueTypeIds,
			typeIdsCount,
			//uniqueSupervisorIds,
			supervisorIdsCount,
			//uniqueTaxesInsuranceIds,
			taxesInsuranceIdsCount,
			//uniqueSalesTaxStateIds,
			salesTaxStateIdsCount,
			//uniqueJobPayrollTaxStateIds,
			jobPayrollTaxStateIdsCount,
			//uniqueHoursCategoryIDs,
			hoursCategoryIDsCount,
		});
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json(
			{ error: "Unable to get WT Data" },
			{ status: 500 }
		);
	}

	/// GET SUMMARY DATA
}
