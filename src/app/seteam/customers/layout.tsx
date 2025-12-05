import { AddJobProvider } from "@/contexts/AddJobContext";
import { HoursCategoryProvider } from "@/contexts/HoursCategoryContext";
import { HoursRuleProvider } from "@/contexts/HoursRuleContext";
import { JobPayrollTaxStateProvider } from "@/contexts/JobPayrollTaxStateContext";
import { SalesTaxStateProvider } from "@/contexts/SalesTaxStateContext";
import { SupervisorProvider } from "@/contexts/SupervisorContext";
import { TaxesInsuranceProvider } from "@/contexts/TaxesInsuranceContext";
import { Tier1Provider } from "@/contexts/tiers/Tier1Context";
import { Tier2Provider } from "@/contexts/tiers/Tier2Context";
import { Tier3Provider } from "@/contexts/tiers/Tier3Context";
import { Tier4Provider } from "@/contexts/tiers/Tier4Context";
import { Tier5Provider } from "@/contexts/tiers/Tier5Context";
import { Tier6Provider } from "@/contexts/tiers/Tier6Context";
import { Tier7Provider } from "@/contexts/tiers/Tier7Context";
import { CustomerJobsProvider } from "@/contexts/CustomerJobsContext";

export default async function CustomerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<CustomerJobsProvider>
				<Tier7Provider>
					<Tier6Provider>
						<Tier5Provider>
							<Tier4Provider>
								<Tier3Provider>
									<Tier2Provider>
										<Tier1Provider>
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
										</Tier1Provider>
									</Tier2Provider>
								</Tier3Provider>
							</Tier4Provider>
						</Tier5Provider>
					</Tier6Provider>
				</Tier7Provider>
			</CustomerJobsProvider>
		</>
	);
}
