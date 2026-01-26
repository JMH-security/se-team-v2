import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function checkAdminAuth() {
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});

	if (!session?.user?.email) {
		return { authorized: false, error: "Not authenticated" };
	}

	await connectDB();
	const currentUser = await User.findOne({ email: session.user.email }).select(
		"-password"
	);

	if (
		!currentUser ||
		!["admin", "ADMIN", "Admin", "super-admin"].includes(currentUser.role)
	) {
		return { authorized: false, error: "Not authorized" };
	}

	return { authorized: true, user: currentUser };
}

export async function GET() {
	try {
		const authCheck = await checkAdminAuth();
		if (!authCheck.authorized) {
			return NextResponse.json({ error: authCheck.error }, { status: 403 });
		}

		await connectDB();
		const users = await User.find({}).select("-password");
		return NextResponse.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Failed to fetch users" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const authCheck = await checkAdminAuth();
		if (!authCheck.authorized) {
			return NextResponse.json({ error: authCheck.error }, { status: 403 });
		}

		const { userIds, role } = await request.json();

		await connectDB();
		await User.updateMany({ _id: { $in: userIds } }, { $set: { role: role } });
		const updatedUsers = await User.find({}).select("-password");
		return NextResponse.json(updatedUsers);
	} catch (error) {
		console.error("Error assigning role:", error);
		return NextResponse.json(
			{ error: "Failed to assign role" },
			{ status: 500 }
		);
	}
}
