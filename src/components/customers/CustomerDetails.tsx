"use client";

import { useState } from "react";
import { Customer } from "@/types/customer";
import Invoices from "@/components/customers/CustomerInvoiceList";
import { Button } from "../ui/button";

import { useParams } from "next/navigation";
import AddJobForm from "@/components/job/AddJobForm";
import CustomerJobsForm from "../customerJobs/CustomerJobsForm";

interface CustomerDetailsProps {
	customer: Customer;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
	const [showInvoices, setShowInvoices] = useState(false);
	const [showJobAddForm, setShowJobAddForm] = useState(false);
	console.log("customer details", customer);
	const params = useParams();
	const custId = params.CustomerID;
	return (
		<div className="p-6">
			<div className="bg-gp text-primary p-6 rounded-lg mb-6">
				<h1 className="bg-gp text-2xl font-bold mb-4">
					{customer.CustomerName}
				</h1>
				<div className="bg-gp grid grid-cols-2 gap-4">
					<div>
						<p>Customer Number: {customer.CustomerNumber}</p>
						<p>Address: {customer.Address?.Address1}</p>
						{customer.Address?.Address2 && <p>{customer.Address.Address2}</p>}
						<p>
							{customer.Address?.City}, {customer.Address?.State}{" "}
							{customer.Address?.Zip}
						</p>
						<p>Phone: {customer.Phone}</p>
						{customer.Fax && <p>Fax: {customer.Fax}</p>}
					</div>
					<div>
						{customer.CustomFields?.map((field) => (
							<p key={field.FieldNumber}>
								Field {field.FieldNumber}: {field.Value}
							</p>
						))}
					</div>
				</div>
			</div>

			<div className="flex gap-4">
				<Button className="bg-secondary text-black px-6 py-2 rounded">
					View Jobs
				</Button>
				<Button
					onClick={() => setShowJobAddForm(!showJobAddForm)}
					className="bg-secondary text-black px-6 py-2 rounded"
				>
					Add New Job
				</Button>
				<Button
					onClick={() => setShowInvoices(!showInvoices)}
					className="bg-secondary text-black px-6 py-2 rounded"
				>
					{showInvoices ? "Close Invoices" : "Invoices"}
				</Button>
			</div>
			<CustomerJobsForm
				custNum={customer.CustomerNumber?.toString()}
				custId={customer.CustomerID?.toString()}
			/>

			{showInvoices && (
				<Invoices customerNumber={customer.CustomerNumber?.toString() || ""} />
			)}
			{showJobAddForm && <AddJobForm customer={customer} addJob={undefined} />}
			<div className="m-4"></div>
		</div>
	);
}
