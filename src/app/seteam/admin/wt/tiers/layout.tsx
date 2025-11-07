import { Tier1Provider } from "@/contexts/tiers/Tier1Context";

export default async function TierLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Tier1Provider>
			<>{children}</>
		</Tier1Provider>
	);
}
