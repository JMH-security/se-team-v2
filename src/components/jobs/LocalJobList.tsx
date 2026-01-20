import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import LocalJobForm from "../localJob/LocalJobForm";

function LocalJobList({
	localJobs,
	customer,
	updateLocalJob,
	deleteLocalJob,
	displayJobForm,
}: {
	localJobs: any[];
	deleteLocalJob: (id: string) => void;
	updateLocalJob: (id: string) => void;
	displayJobForm: boolean;
}) {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [showLocalJobForm, setShowLocalJobForm] = useState(false);
	const [isNarrow, setIsNarrow] = useState<boolean>(false);
	console.log("LocalJobList localJobs:", localJobs, customer);

	return (
		<div className="container mx-auto text-center p-4 m-4 max-w-[800px]">
			<div className="bg-primary/10 rounded-2xl px-4">
				{editingId === null && displayJobForm && (
					<div className="text-2xl font-bold">
						<h2 className="m-4">ADD A JOB</h2>
						<LocalJobForm
							customer={customer}
							onSuccess={() => {
								setEditingId(null);
								setShowLocalJobForm(false);
							}}
						/>
					</div>
				)}
				{editingId && (
					<div className="text-2xl font-bold">
						<h2 className="m-4">EDIT JOB</h2>
						<LocalJobForm
							localJob={localJobs.find((job) => job._id === editingId)}
							customer={customer}
							onSuccess={() => {
								setEditingId(null);
								setShowLocalJobForm(false);
							}}
						/>
					</div>
				)}
			</div>

			<div className="container px-4 m-4 bg-primary/10 rounded-2xl">
				<div className="flex flex-row">
					<Item className="w-48 flex-none">
						<ItemContent>
							<ItemTitle>JobID</ItemTitle>
						</ItemContent>
					</Item>
					<Item className="w-32 flex-auto">
						<ItemTitle>Job Name</ItemTitle>
					</Item>
				</div>

				<ul className="mt-4 space-y-2">
					{localJobs.map((job) => (
						<li key={job._id} className="flex justify-between items-center">
							<div className="flex">
								<Item className="w-48 flex-none">
									<ItemContent>
										<ItemTitle>{job.jobNumber}</ItemTitle>
									</ItemContent>
								</Item>
								<Item className="w-48 flex-auto">
									<ItemDescription>{job.jobDescription}</ItemDescription>
								</Item>
							</div>
							<div className="space-x-2">
								<Button variant="outline" onClick={() => setEditingId(job._id)}>
									Edit
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => deleteLocalJob(job._id)}
								>
									Delete
								</Button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default LocalJobList;
