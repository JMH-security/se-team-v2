'use server';


import { revalidatePath } from 'next/cache';

import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { JobSchema } from '@/lib/validation';


export async function addJob(prevState: {
        message: string;
    },
    formData: FormData) {


  await connectDB();
  console.log('FormData:', formData);


  
  const parse = JobSchema.safeParse({
    jobNumber: formData.get("jobNumber"),
    jobName: formData.get("jobName"),
    customerId: formData.get("customerId")
  })

  if (!parse.success) {
    return { success: false, error: parse.error.format() };
  }

  const { jobNumber, jobName, customerId } = parse.data;
  console.log('Parsed Data:', parse.data);
  await Job.create({ jobNumber, jobName, customer: customerId });

  return { success: true };
}
