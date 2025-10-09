import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Image from "next/image";
import NavMenu from "../navigationMenu/NavMenu";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function Header() {
	// Connect to the database
	await connectDB();

	// Get the session user
	const session = await auth();

	// Initialize a variable to store the user's role
	let sessionUser = null;
	let userRole = null;

	if (session?.user?.email) {
		// Query the user's role from the database
		sessionUser = await User.findOne({ email: session.user.email }).select(
			"-password"
		);
		userRole = sessionUser?.role;
	}

	return (
		<>
			<div className="flex flex-row grow bg-foreground text-background">
				{session ? (
					<div className="flex flex-row grow">
						<div className="flex flex-row grow">
							<Image
								src="/se-shield.png"
								width={50}
								height={50}
								alt="Security Engineers logo"
								priority
							/>
						</div>
						<div className="flex flex-wrap items-center mr-2">
							<div className="flex flex-col m-4">
								<h1 className="text-xs">{session?.user?.name}</h1>
								<h1 className="text-xs">
									{sessionUser?.role || "Role not found"}
								</h1>
							</div>
							<div className="flex flex-wrap items-center">
								<Avatar className="m-2">
									<AvatarImage
										src={session.user.image || "/se-shield.png"}
										alt="Avatar"
									/>
								</Avatar>
							</div>
							<div className="">
								<Button asChild variant="secondary">
									<Link href="/api/auth/signout">Logout</Link>
								</Button>
							</div>
						</div>
					</div>
				) : (
					<div>
						<h1>Not Logged In</h1>
					</div>
				)}
			</div>
			<NavMenu role={userRole} />
		</>
	);
}
