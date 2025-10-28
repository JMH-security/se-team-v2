import { SupervisorProvider } from "@/contexts/SupervisorContext";
import { RegionProvider } from "@/contexts/RegionContext";
import { TaxesInsuranceProvider } from "@/contexts/TaxesInsuranceContext";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TaxesInsuranceProvider>
			<SupervisorProvider>
				<RegionProvider>
					<>{children}</>
				</RegionProvider>
			</SupervisorProvider>
		</TaxesInsuranceProvider>
	);
}
