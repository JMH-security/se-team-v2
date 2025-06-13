import { z } from 'zod'; 

export const sampleFormSchema = z.object({

    first: z.string().trim().min(3, {
      message: 'First name is required'
    }),
    last: z.string().trim().min(2, {
      message: 'Last name is required'
    }),
    email: z.string().trim().email({
      message: 'Invalid Email'
    }),
    regionId: z.string().trim().min(1, {
      message: 'Region is required'})
    })