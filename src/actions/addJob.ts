'use server';


import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import { Job } from '@/models/Job';
// import { JobSchema } from '@/lib/validation';
import { jobFormSchema } from '@/lib/formSchemas/jobSchema'



//################# STEP 1 - Add job to WinTeam    #######################

export async function addJob(prevState: {
        message: string;
    },
    formData: FormData) {
      console.log('FormData:', formData);
  
  
      await connectDB();
  
  console.log('FormData:', formData);

  const parse = jobFormSchema.safeParse({
    jobNumber: formData.get("jobNumber"),
    jobDescription: formData.get("jobDescription"),
    customerId: formData.get("customerId"),
    regionId: formData.get("regionId"),
    branchId: formData.get("branchId")
  })

  if (!parse.success) {
    console.log('Parse failed');
    return { success: false, error: parse.error.format() };
  }

  const { jobNumber, jobDescription, customerId, regionId, branchId } = parse.data;
  console.log('Parsed Data:', parse.data);
  const jobFinal = {
    jobNumber: jobNumber,
    jobDescription: jobDescription,
    customerId: customerId,
    regionId: regionId,
    branchId: branchId
  }

    console.log('Job Final:', jobFinal);


    // SEND JOB TO WINT 







    await Job.create(jobFinal);
  revalidatePath('/')

  return { success: true };
}
