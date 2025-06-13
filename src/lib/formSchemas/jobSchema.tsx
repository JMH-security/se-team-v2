import { z } from 'zod';

const customFields = z.object({
  fieldNumber: z.number(),
  value: z.string().trim()
})

const jobTier = z.object({
  tierId: z.string().trim().min(2),
  tierValue: z.string().trim(),
  tierValueDescription: z.string().trim(),
})

const addressSchema = z.object({
  address1: z.string().trim().min(5, { message: "Address must be at least 5 characters" }).max(50, { message: "Address must be 50 or fewer characters" }),
  address2: z.string().trim().optional(),
  city: z.string().trim().min(2, { message: "City must be at least 2 characters" }).max(50, { message: "City must be 50 or fewer characters" }),
  state: z.string().trim().min(2, { message: "State must be at least 2 characters" }).max(50, { message: "State must be 50 or fewer characters" }),
  zip: z.string().trim().min(5, { message: "Zip must be at least 5 characters" }).max(10, { message: "Zip must be 10 or fewer characters" })
})

export const jobFormSchema = z.object({
    jobId: z.string().trim().optional(),
    companyNumber: z.number().optional(),
    hoursRuleId: z.number({message: "Please select a Hours Rule"}),  
    jobNumber: z.string().trim().min(4, {message: "Job Number must be at least 4 characters"}).max(10, {message: "Job Number must be 10 or fewer characters"}),
    jobDescription: z.string().trim().min(10, {message: "Please provide more description"}).max(50, {message: "Job Description must be 50 or fewer characters"}),
    locationId: z.number(),
    address: addressSchema,
    taxAddress: addressSchema,
    jobAttention: z.string().trim().optional(),
    typeId: z.number(),
    supervisorId: z.number(),
    salesTaxStateId: z.number(),
    jobPayrollTaxStateId: z.number(),
    hoursCategoryId: z.number(),
    jobTier: z.array(jobTier),
    taxesInsuranceId: z.number().optional(),
    customFields_0_value: z.string().trim().optional(),
    customFields: z.array(customFields).optional(),
    isAvalaraClient: z.boolean().optional(),
    customerId: z.string().min(30).max(40),
    regionId: z.string(),
    branchId: z.number(),
    timeKeepingJob: z.boolean().optional(),
    timeSheetTypeId: z.number().optional()
  })

  export type JobFormData = z.infer<typeof jobFormSchema>;