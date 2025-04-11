import { JobItem } from '@/components/jobCreate/JobItem';
import { Job } from '@/types/job';

export function JobsList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid gap-2">
      {jobs.map((job) => <JobItem key={job._id} job={job} />)}
    </div>
  );
}