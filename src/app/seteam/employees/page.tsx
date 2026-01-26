import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Data, EmployeeResponse } from "@/types/employee";
import Employees from "@/components/employees/Employees";

export default async function WtEmployees() {
	//Verify user is logged in before fetching data
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});
	if (!session) {
		redirect("/");
	}
	try {
		const headerValues = {
			"Ocp-apim-subscription-key": process.env.WT_SUB_KEY || "",
			TenantID: process.env.WT_TENANT_DEV_ID || "",
		};

		const res = await fetch(`${process.env.EMPLOYEE_API_URL}`, {
			method: "GET",
			headers: headerValues,
		});
		const wtEmployees: Data = await res.json();
		const wtEEresults: EmployeeResponse = wtEmployees.data[0];
		const wtEEarray = wtEEresults.results;

		return <Employees employees={wtEEarray} />;
	} catch (error) {
		console.error("Error:", error);
		throw error; // This will trigger Next.js error boundary
	}
}
