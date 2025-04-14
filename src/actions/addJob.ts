'use server';


import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
import { JobSchema } from '@/lib/validation';



//################# STEP 1 - Add job to WinTeam    #######################

export async function addJob(prevState: {
        message: string;
    },
    formData: FormData) {

  await connectDB();
  console.log('FormData:', formData);

  const parse = JobSchema.safeParse({
    jobNumber: formData.get("jobNumber"),
    jobDescription: formData.get("jobDescription"),
    customerId: formData.get("customerId")
  })

  if (!parse.success) {
    console.log('PARsE fIALED');
    return { success: false, error: parse.error.format() };
  }

  const { jobNumber, jobDescription, customerId } = parse.data;
  console.log('Parsed Data:', parse.data);
  const jobFinal = {
    jobNumber: jobNumber,
    jobDescription: jobDescription,
    customerId: customerId}

    console.log('Job Final:', jobFinal);


    // SEND JOB TO WINT 







    await Job.create(jobFinal);
  revalidatePath('/')

  return { success: true };
}
