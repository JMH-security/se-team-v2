import Image from "next/image";
import { ModeToggle } from "@/components/header/ModeToggle";
import LoginForm from "@/components/formLogin/LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
	// Check if the user is loged in and if so redirect to seteam home page
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});
	if (session) {
		console.log("Already logged in - Redirecting to /seteam");
		return redirect("/seteam");
	}

	return (
		<>
			<div className="grid items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20">
				<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
					<ModeToggle />
					<div className="flex flex-wrap justify-center">
						<div className="flex flex-wrap justify-center items-center mb-18">
							<h1 className="text-2xl font-bold justify-center">
								Welcome Team
							</h1>
						</div>

						<div className="flex flex-wrap items-center justify-center min-w-full mb-8">
							<Image
								className=""
								src="/se-shield.png"
								alt="Security Engineers logo"
								width={240}
								height={240}
								priority
							/>
						</div>
						<div className="flex flex-wrap items-center justify-center">
							<LoginForm />
						</div>
					</div>
				</main>
				<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
					<div className="flex flex-wrap items-center justify-center">
						<div className="m-4">
							<h1>Responsive.</h1>
						</div>
						<div className="m-4">
							<h1>Committed.</h1>
						</div>
						<div className="m-4">
							<h1>Innovative.</h1>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}
