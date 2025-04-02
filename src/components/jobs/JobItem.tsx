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
      <div>
        <div className="flex flex-row bg-primary-foreground rounded max-w-5xl">
          <div className="justify-center grow">
            <li
              key={jobId}
              className="flex items-center justify-center text-inherit"
            >
              <div className="flex flex-row m-2 min-w-24">
                {jobNumber}
              </div>
              <div className="flex grow m-2">{jobDescription}</div>
              <div className="flex m-2 text-xs text-secondary">{ typeId===1 ? 'Active' : 'Inactive'}</div>
              <div className="p-2 flex">
                <Button id={jobId} onClick={handleDetailsClick} className="btn btn-info text-secondary" variant="outline">
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
