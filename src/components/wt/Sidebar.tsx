import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {
	return (
		<div className="w-64 bg-[#CAB559] h-screen p-4">
			<h2 className="text-xl font-bold mb-4">WinTeam Static Data</h2>
			<nav>
				<ul>
					<li>
						<Link href="/seteam/admin/wt/regions">
							<Button variant="ghost" className="w-full text-left">
								Regions
							</Button>
						</Link>
					</li>
					<li>
						<Link href="/seteam/admin/wt/supervisors">
							<Button variant="ghost" className="w-full text-left">
								Supervisors
							</Button>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
