import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";
import PTOApprovalPage from "./PTOApprovalPage";

export default async function AdminPTOPage() {
	await connectDB();
	const session = await auth();

	if (!session?.user?.email) {
		redirect("/api/auth/signin");
	}

	// Check if user is admin
	const user = await User.findOne({ email: session.user.email });
	const isAdmin = user?.role === "admin" || user?.role === "super-admin";

	if (!isAdmin) {
		redirect("/seteam");
	}

	return <PTOApprovalPage />;
}
