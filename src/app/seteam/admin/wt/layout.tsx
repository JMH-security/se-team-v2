import { SupervisorProvider } from "@/contexts/SupervisorContext";
import { RegionProvider } from "@/contexts/RegionContext";
import { TaxesInsuranceProvider } from "@/contexts/TaxesInsuranceContext";
import { SalesTaxStateProvider } from "@/contexts/SalesTaxStateContext";
import { JobPayrollTaxStateProvider } from "@/contexts/JobPayrollTaxStateContext";
import { HoursRuleProvider } from "@/contexts/HoursRuleContext";
import { HoursCategoryProvider } from "@/contexts/HoursCategoryContext";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<HoursCategoryProvider>
			<HoursRuleProvider>
				<JobPayrollTaxStateProvider>
					<SalesTaxStateProvider>
						<TaxesInsuranceProvider>
							<SupervisorProvider>
								<RegionProvider>
									<>{children}</>
								</RegionProvider>
							</SupervisorProvider>
						</TaxesInsuranceProvider>
					</SalesTaxStateProvider>
				</JobPayrollTaxStateProvider>
			</HoursRuleProvider>
		</HoursCategoryProvider>
	);
}
