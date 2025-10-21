import { Supervisor } from "@/types/supervisor";
import SupervisorContextProvider from "@/contexts/SupervisorContextProvider";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	//***************FETCH SUPERVISORS **********************************************/

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/wt/supervisors`
	);
	const data: Supervisor[] = await response.json();

	//***************END FETCH SUPERVISORS **********************************************/

	return (
		<SupervisorContextProvider data={data}>
			<div className="bg-white">{children}</div>
		</SupervisorContextProvider>
	);
}
