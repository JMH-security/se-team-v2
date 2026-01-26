import Header from "@/components/header/Header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SeteamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// VERIFY USER IS LOGGED IN
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<Header />
			<section>{children}</section>
		</>
	);
}
