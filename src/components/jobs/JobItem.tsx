import { redirect } from "next/navigation";
import { Button } from "../ui/button";

type JobProps = {
	jobId: string;
	jobDescription: string;
	jobNumber: string;
	typeId: number;
};

export default function JobItem({
	jobId,
	jobDescription,
	jobNumber,
	typeId,
}: JobProps) {
	const handleDetailsClick = () => {
		redirect(`/seteam/jobs/${jobId}`);
	};
	return (
		<>
			<div className="ml-8">
				<div className="flex flex-row justify-center bg-primary-foreground rounded max-w-5xl">
					<div className="justify-center grow text-sm">
						<li key={jobId} className="flex items-center justify-center">
							<div className="flex flex-row m-2 min-w-24">{jobNumber}</div>
							<div className="flex grow m-2">{jobDescription}</div>
							<div className="flex mr-4 text-sm text-secondary">
								{typeId === 1 ? "Active" : "Inactive"}
							</div>
							<div className="p-2 flex">
								<Button
									id={jobId}
									onClick={handleDetailsClick}
									className="btn btn-info text-sm"
								>
									Job Details
								</Button>
							</div>
						</li>
					</div>
				</div>
			</div>
		</>
	);
}
