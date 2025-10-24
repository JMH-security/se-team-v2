import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Image from "next/image";

const SETEAMHOME = async () => {
	// Connect to the database
	await connectDB();

	// Get the session user
	const session = await auth();

	// Initialize a variable to store the user's role
	let sessionUser = null;

	if (session?.user?.email) {
		// Query the user's role from the database
		sessionUser = await User.findOne({ email: session.user.email }).select(
			"-password"
		);
	}

	return (
		<>
			{session ? (
				<div className="flex flex-col items-center justify-center m-4">
					<h1 className="text-6xl font-extrabold text-center">
						SECURITY ENGINEERS
					</h1>
					<h2 className="text-4xl font-extrabold text-center text-zinc-400">
						TEAM APP HOME
					</h2>
					<div className="mt-24">
						<Image
							className=""
							src="/se-shield.png"
							alt="Security Engineers logo"
							width={240}
							height={240}
							priority
						/>
					</div>
				</div>
			) : (
				<div>
					<h1>Not Logged In</h1>
				</div>
			)}
		</>
	);
};

export default SETEAMHOME;
