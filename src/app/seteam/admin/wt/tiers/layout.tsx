import { Tier1Provider } from "@/contexts/tiers/Tier1Context";
import { Tier2Provider } from "@/contexts/tiers/Tier2Context";
import { Tier3Provider } from "@/contexts/tiers/Tier3Context";
import { Tier4Provider } from "@/contexts/tiers/Tier4Context";
import { Tier5Provider } from "@/contexts/tiers/Tier5Context";
import { Tier6Provider } from "@/contexts/tiers/Tier6Context";
import { Tier7Provider } from "@/contexts/tiers/Tier7Context";

export default async function TierLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Tier7Provider>
			<Tier6Provider>
				<Tier5Provider>
					<Tier4Provider>
						<Tier3Provider>
							<Tier2Provider>
								<Tier1Provider>
									<>{children}</>
								</Tier1Provider>
							</Tier2Provider>
						</Tier3Provider>
					</Tier4Provider>
				</Tier5Provider>
			</Tier6Provider>
		</Tier7Provider>
	);
}
