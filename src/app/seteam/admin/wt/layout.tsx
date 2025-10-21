import { SupervisorProvider } from "@/contexts/SupervisorContext";
import { RegionProvider } from "@/contexts/RegionContext";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SupervisorProvider>
			<RegionProvider>
				<div className="bg-white">{children}</div>
			</RegionProvider>
		</SupervisorProvider>
	);
}
