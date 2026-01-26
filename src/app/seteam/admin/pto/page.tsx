import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";
import PTOApprovalPage from "./PTOApprovalPage";

export default async function AdminPTOPage() {
	await connectDB();
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});

	if (!session?.user?.email) {
		redirect("/");
	}

	// Check if user is admin
	const user = await User.findOne({ email: session.user.email });
	const isAdmin = user?.role === "admin" || user?.role === "super-admin";

	if (!isAdmin) {
		redirect("/seteam");
	}

	return <PTOApprovalPage />;
}
