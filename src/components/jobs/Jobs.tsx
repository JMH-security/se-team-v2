"use client";

import { Job } from "@/types/job";
import { useState } from "react";

import JobItem from "@/components/jobs/JobItem";
import JobSearchBar from "@/components/jobs/JobSearchBar";

interface JobsProps {
	jobs: Job[];
}

const Jobs: React.FC<JobsProps> = ({ jobs }) => {
	const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
	const recordCount = filteredJobs.length;

	return (
		<>
			<div className="max-w-[1400px] mx-auto">
				<div className="flex flex-row items-center">
					<div className="flex flex-row grow">
						<JobSearchBar jobs={jobs} onFilter={setFilteredJobs} />
					</div>
					<h1 className="flex mr-2 ml-2">Results: {recordCount}</h1>
				</div>
				<ul className="space-y-1 p-2 bg-input">
					{filteredJobs.map((job, index) => (
						<JobItem
							key={`job-${index}`}
							jobId={job.jobId}
							jobNumber={job.jobNumber}
							jobDescription={job.jobDescription}
							typeId={job.typeId}
						/>
					))}
				</ul>
			</div>
		</>
	);
};

export default Jobs;
