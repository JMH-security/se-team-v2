import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {
	return (
		<div className="w-64 bg-gray-100 h-screen p-4">
			<h2 className="text-xl font-bold mb-4">Admin Panel</h2>
			<nav>
				<ul>
					<li>
						<Link href="/wt/admin/regions">
							<Button variant="ghost" className="w-full text-left">
								Regions
							</Button>
						</Link>
					</li>
					<li>
						<Link href="/wt/admin/supervisors">
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
