import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";
import PTORequestPage from "./PTORequestPage";

export default async function PTOPage() {
	await connectDB();
	const session = await auth();

	if (!session?.user?.email) {
		redirect("/api/auth/signin");
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
