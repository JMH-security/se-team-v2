import { AddJobProvider } from "@/contexts/AddJobContext";
import { HoursCategoryProvider } from "@/contexts/HoursCategoryContext";
import { HoursRuleProvider } from "@/contexts/HoursRuleContext";
import { JobPayrollTaxStateProvider } from "@/contexts/JobPayrollTaxStateContext";
import { SalesTaxStateProvider } from "@/contexts/SalesTaxStateContext";
import { SupervisorProvider } from "@/contexts/SupervisorContext";
import { TaxesInsuranceProvider } from "@/contexts/TaxesInsuranceContext";

export default async function CustomerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<TaxesInsuranceProvider>
				<JobPayrollTaxStateProvider>
					<SalesTaxStateProvider>
						<SupervisorProvider>
							<HoursCategoryProvider>
								<HoursRuleProvider>
									<AddJobProvider>{children}</AddJobProvider>
								</HoursRuleProvider>
							</HoursCategoryProvider>
						</SupervisorProvider>
					</SalesTaxStateProvider>
				</JobPayrollTaxStateProvider>
			</TaxesInsuranceProvider>
		</>
	);
}
