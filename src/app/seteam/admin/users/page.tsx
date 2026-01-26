import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import UserManagementClient from "./UserManagementClient";

export default async function AdminUsersPage() {
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});

	if (!session?.user?.email) {
		redirect("/");
	}

	await connectDB();
	const currentUser = await User.findOne({ email: session.user.email }).select(
		"-password"
	);

	if (
		!currentUser ||
		!["admin", "ADMIN", "Admin", "super-admin"].includes(currentUser.role)
	) {
		redirect("/seteam");
	}

	return <UserManagementClient />;
}
