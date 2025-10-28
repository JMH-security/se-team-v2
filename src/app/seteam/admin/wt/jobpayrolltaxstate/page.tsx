// app/seteam/admin/wt/jobPayrollTaxStates/page.tsx
"use client";

import { useJobPayrollTaxState } from "@/contexts/JobPayrollTaxStateContext";
import JobPayrollTaxStateForm from "@/components/wt/jobPayrollTaxState/JobPayrollTaxStateForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

export default function JobPayrollTaxStatesPage() {
	const { jobPayrollTaxStates, deleteJobPayrollTaxState } =
		useJobPayrollTaxState();
	const [editingId, setEditingId] = useState<string | null>(null);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && (
					<h1 className="text-2xl font-bold mb-4">Add Job Payroll Tax State</h1>
				)}
				{editingId && (
					<h1 className="text-2xl font-bold mb-4">
						Edit Job Payroll Tax State
					</h1>
				)}
				{editingId === null && (
					<JobPayrollTaxStateForm onSuccess={() => setEditingId(null)} />
				)}
				{editingId && (
					<div className="mt-4">
						<h2>Edit JobPayrollTaxState</h2>
						<JobPayrollTaxStateForm
							jobPayrollTaxState={jobPayrollTaxStates.find(
								(r) => r._id === editingId
							)}
							onSuccess={() => setEditingId(null)}
						/>
					</div>
				)}
			</div>
			<div className="container px-4 m-4 bg-primary/10 rounded-2xl">
				<div className="flex flex-row">
					<Item className="flex-1">
						<ItemContent>
							<ItemTitle>ID</ItemTitle>
						</ItemContent>
					</Item>
					<Item className="flex-4">
						<ItemTitle>Job Payroll Tax State</ItemTitle>
					</Item>
				</div>

				<ul className="mt-4 space-y-2">
					{jobPayrollTaxStates.map((reg) => (
						<li key={reg._id} className="flex justify-between items-center">
							<div className="flex flex-wrap  w-full">
								<div className="flex grow ">
									<Item className="flex-1">
										<ItemContent>
											<ItemTitle>{reg.jobPayrollTaxStateId}</ItemTitle>
										</ItemContent>
									</Item>
									<Item className="flex-3">
										<ItemDescription>
											{reg.jobPayrollTaxStateName}
										</ItemDescription>
									</Item>
								</div>
								<div className="flex justify-end items-center">
									<Button
										className="mx-2"
										variant="outline"
										onClick={() => setEditingId(reg._id)}
									>
										Edit
									</Button>
									<Button
										className="mx-2"
										size="sm"
										variant="destructive"
										onClick={() => deleteJobPayrollTaxState(reg._id)}
									>
										Delete
									</Button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
