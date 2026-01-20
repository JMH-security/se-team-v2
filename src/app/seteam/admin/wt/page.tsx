"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const navSections = [
	{
		title: "Geographic",
		items: [
			{ label: "Regions", href: "/seteam/admin/wt/regions" },
			{ label: "Locations", href: "/seteam/admin/wt/locations" },
		],
	},
	{
		title: "Taxes & Insurance",
		items: [
			{ label: "Taxes & Insurance", href: "/seteam/admin/wt/taxesinsurance" },
			{ label: "Sales Tax State", href: "/seteam/admin/wt/salestaxstate" },
			{
				label: "Job Payroll Tax State",
				href: "/seteam/admin/wt/jobpayrolltaxstate",
			},
		],
	},
	{
		title: "Hours",
		items: [
			{ label: "Hours Rule", href: "/seteam/admin/wt/hoursrule" },
			{ label: "Hours Category", href: "/seteam/admin/wt/hourscategory" },
		],
	},
	{
		title: "Tiers",
		items: [
			{ label: "Tier 1", href: "/seteam/admin/wt/tiers/tier1" },
			{ label: "Tier 2", href: "/seteam/admin/wt/tiers/tier2" },
			{ label: "Tier 3", href: "/seteam/admin/wt/tiers/tier3" },
			{ label: "Tier 4", href: "/seteam/admin/wt/tiers/tier4" },
			{ label: "Tier 5", href: "/seteam/admin/wt/tiers/tier5" },
			{ label: "Tier 6", href: "/seteam/admin/wt/tiers/tier6" },
			{ label: "Tier 7", href: "/seteam/admin/wt/tiers/tier7" },
		],
	},
	{
		title: "Personnel",
		items: [
			{ label: "Supervisors", href: "/seteam/admin/wt/supervisors" },
			{ label: "Vendors", href: "/seteam/admin/wt/vendors" },
		],
	},
];

const Page = () => {
	return (
		<div className="container mx-auto p-4 max-w-[900px]">
			<h1 className="text-2xl font-bold mb-6 text-center">WT Admin</h1>
			<div className="space-y-6">
				{navSections.map((section) => (
					<div
						key={section.title}
						className="bg-primary/10 rounded-2xl p-4"
					>
						<h2 className="text-lg font-semibold mb-3">{section.title}</h2>
						<div className="flex flex-wrap gap-2">
							{section.items.map((item) => (
								<Link key={item.href} href={item.href}>
									<Button variant="outline">{item.label}</Button>
								</Link>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Page;
