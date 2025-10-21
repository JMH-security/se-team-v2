import Header from "@/components/header/Header";
//import Footer from "../components/Footer"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SeteamLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	//VERIFY USER IS LOGGED IN
	const session = await auth();
	if (!session) {
		redirect("/");
	}

	return (
		<>
			<Header />

			<section>{children}</section>
			{/* <Footer /> */}
		</>
	);
}
