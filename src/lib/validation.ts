
import { z } from 'zod';




//START JOB VALIDATION
export const JobSchema = z.object({
  jobNumber: z.string().min(1),
  jobName: z.string().min(1),
  customerId: z.string().min(1),
});

export type JobFormData = z.infer<typeof JobSchema>;

//END JOB VALIDATION