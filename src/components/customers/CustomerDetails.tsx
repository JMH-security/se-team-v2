"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Customer } from "@/types/customer";
import Invoices from "@/components/customers/CustomerInvoiceList";
import { Button } from "../ui/button";

import { useParams } from "next/navigation";
import LocalJobForm from "../localJob/LocalJobForm";
import LocalJobList from "../jobs/LocalJobList";
import { useLocalJob } from "@/contexts/localJobContext";

interface CustomerDetailsProps {
	customer: Customer;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
	const [showLocalJobs, setShowLocalJobs] = useState(false);
	const [showInvoices, setShowInvoices] = useState(false);
	const [showJobAddForm, setShowJobAddForm] = useState(false);

	const { localJobs, fetchLocalJobs, deleteLocalJob, updateLocalJob } =
		useLocalJob();

	const [isNarrow, setIsNarrow] = useState<boolean>(false);

	useEffect(() => {
		const checkWidth = () => setIsNarrow(window.innerWidth < 500);
		// set initial
		checkWidth();
		window.addEventListener("resize", checkWidth);
		return () => window.removeEventListener("resize", checkWidth);
	}, []);

	console.log(
		"customer details",
		customer.CustomerNumber,
		"# of localJobs",
		localJobs.length,
	);
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
				<Button
					onClick={() => setShowLocalJobs(!showLocalJobs)}
					className="bg-secondary text-black px-6 py-2 rounded"
				>
					View Jobs
				</Button>
				{showLocalJobs && (
					<Button
						onClick={() => setShowJobAddForm(!showJobAddForm)}
						className="bg-secondary text-black px-6 py-2 rounded"
					>
						Add New Job
					</Button>
				)}

				<Button
					onClick={() => setShowInvoices(!showInvoices)}
					className="bg-secondary text-black px-6 py-2 rounded"
				>
					{showInvoices ? "Close Invoices" : "Invoices"}
				</Button>
			</div>

			{showInvoices && (
				<Invoices customerNumber={customer.CustomerNumber?.toString() || ""} />
			)}

			<div className="m-4"></div>

			{showLocalJobs && (
				<LocalJobList
					customer={customer}
					displayJobForm={showJobAddForm}
					localJobs={localJobs}
					deleteLocalJob={deleteLocalJob}
					updateLocalJob={(id: string) => {}}
				/>
			)}
		</div>
	);
}
