import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { JobData } from "@/types/job";
import Jobs from "@/components/jobs/Jobs";

export default async function WtJobs() {
	//Verify user is logged in before fetching data
	const session = await auth();
	if (!session) {
		redirect("/");
	}
	try {
		const headerValues = {
			"Ocp-apim-subscription-key": process.env.WT_SUB_KEY || "",
			TenantID: process.env.WT_TENANT_PROD_ID || "",
		};

		const res = await fetch(`${process.env.NXT_GET_ALL_JOBS}`, {
			method: "GET",
			headers: headerValues,
		});
		const wtJobs: JobData = await res.json();

		// INCLUDE ONLY ACTIVE JOBS
		const allJobs = wtJobs.data[0].results;

		return <Jobs jobs={allJobs} />;
	} catch (error) {
		console.error("Error:", error);
		throw error; // This will trigger Next.js error boundary
	}
}
