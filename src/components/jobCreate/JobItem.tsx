import { Job } from '@/types/job';

export function JobItem({ job }: { job: Job }) {
  return (
    <div className="border rounded p-2">
      <h4 className="font-bold">{job.jobNumber}</h4>
      <h2 className="font-bold">{job.jobDescription}</h2>
      <p>{job.jobId}</p>
    </div>
  );
}