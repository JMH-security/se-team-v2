import AddVendor from "@/components/vendor/AddVendor";

export default function VendorsPage() {
	return (
		<div className="container mx-auto py-6 px-4 lg:max-w-[75%]">
			<h1 className="text-2xl font-bold mb-6">Add Vendor</h1>
			<AddVendor />
		</div>
	);
}
