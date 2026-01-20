import AddVendor from "@/components/vendor/AddVendor";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VendorsPage() {
	return (
		<div className="container mx-auto py-6 px-4 lg:max-w-[75%]">
			<div className="mb-4">
				<Link href="/seteam/admin/wt">
					<Button variant="outline">Back to WT Admin</Button>
				</Link>
			</div>
			<h1 className="text-2xl font-bold mb-6">Add Vendor</h1>
			<AddVendor />
		</div>
	);
}
