import { SupervisorProvider } from "@/contexts/SupervisorContext";
import { RegionProvider } from "@/contexts/RegionContext";
import { TaxesInsuranceProvider } from "@/contexts/TaxesInsuranceContext";
import { SalesTaxStateProvider } from "@/contexts/SalesTaxStateContext";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SalesTaxStateProvider>
			<TaxesInsuranceProvider>
				<SupervisorProvider>
					<RegionProvider>
						<>{children}</>
					</RegionProvider>
				</SupervisorProvider>
			</TaxesInsuranceProvider>
		</SalesTaxStateProvider>
	);
}
