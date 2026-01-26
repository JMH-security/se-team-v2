import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";
import PTORequestPage from "./PTORequestPage";

export default async function PTOPage() {
	await connectDB();
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});

	if (!session?.user?.email) {
		redirect("/");
	}

	// Get user details
	const user = await User.findOne({ email: session.user.email });

	return (
		<PTORequestPage
			userId={user?._id?.toString() || session.user.email}
			userEmail={session.user.email}
			userName={session.user.name || session.user.email}
		/>
	);
}
