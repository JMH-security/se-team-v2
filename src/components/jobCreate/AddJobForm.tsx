"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { jobFormSchema } from "@/lib/formSchemas/jobSchema"
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form'




import { Region } from "@/types/regions";
import { Supervisor } from "@/types/supervisor";
import { Branch } from "@/types/branch"
import { SalesTaxStateId } from "@/types/salestaxstateid";
import { Customer } from "@/types/customer";
import { Job } from "@/types/job";


import { entityConfig } from "@/components/wt/entityConfig";
import { addJob } from '@/actions/addJob';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const initialState = {
    message: "Initial State",
  };

export const AddJobForm = ( customerObj : Customer ) => {

    const [regions, setRegions] = useState<Region[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
    const [salesTaxStateId, setSalesTaxStateId] = useState<SalesTaxStateId[]>([]);
    
    console.log("Customer Object in AddJobForm:", customerObj);
    console.log("Customer.customer in AddJobForm:", customerObj.customer);
    console.log("Customer.CustomerID AddJobForm:", customerObj.customer.CustomerID);
    console.log("Customer.Phone AddJobForm:", customerObj.CustomerID);

    useEffect(() => {
          getRegions();
          getBranches();
          getSupervisors();
          getSalesTaxStateIds();  
        }, []);
  
    const getRegions = async () => {
      try {
        const res = await fetch(entityConfig.regions.endpointUrl, { method: "GET" });
        const data = await res.json();
        setRegions(data);
      } catch (error) {
        console.error("Error fetching regions", error);
      }
    };
  
    const getBranches = async () => {
      try {
        const res = await fetch(entityConfig.branches.endpointUrl, { method: "GET" });
        const data = await res.json();
        setBranches(data);
      } catch (error) {
        console.error("Error fetching branches", error);
      }
    };
  
    const getSupervisors = async () => {
      try {
        const res = await fetch(entityConfig.supervisors.endpointUrl, { method: "GET" });
        const data = await res.json();
        setSupervisors(data);
      } catch (error) {
        console.error("Error fetching supervisors", error);
      }
    };


    const getSalesTaxStateIds = async () => {
      try {
        const res = await fetch(entityConfig.salestaxstateid.endpointUrl, { method: "GET" });
        const data = await res.json();
        setSalesTaxStateId(data);
      } catch (error) {
        console.error("Error fetching Sales Tax State Ids", error);
      }
    };

  
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      jobId: "",
          companyNumber: 1,
          hoursRuleId: 1,  
          jobNumber: "",
          jobDescription: "",
          locationId: 1,
          address: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: ""
          },
          taxAddress: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: ""
          },
          jobAttention: "",
          typeId: 1,
          supervisorId: 1,
          salesTaxStateId: 1,
          jobPayrollTaxStateId: 1,
          hoursCategoryId: 1,
          jobTier: [{ tierId: "", tierValue: "", tierValueDescription: ""}],
          taxesInsuranceId: 1,
          customFields: [{ fieldNumber: 0, value: ""}],
          isAvalaraClient: false,
          customerId: customerObj.customer.CustomerID,
          regionId: "",
          branchId: 1,
          timeKeepingJob: false,
          timeSheetTypeId: 1
    }})
  
    const [state, formAction] = useActionState(addJob, initialState);

  const onSubmit = async (data: z.infer<typeof jobFormSchema>) => {
    console.log("Form submitted with data:", data);
  } 
  
  
  const Submit = () => {
    console.log("Submit button clicked");
    const { pending } = useFormStatus();
    console.log("useForm Status:", useFormStatus);
    return <Button type="submit" disabled={pending}>{pending ? 'Adding...' : 'Add Job'}</Button>;
  };

  const { fields } = useFieldArray({
    name: "jobTier",
    control: form.control,
  })

  return (

    <div className="flex flex-row min-w-96 p-6 bg-gray-900">

    <Form {...form} action={formAction} className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        

      <FormField
          control={form.control}
          name="companyNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter Company Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="hoursRuleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>hoursRuleId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="hoursRuleId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="jobNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>jobNumber</FormLabel>
              <FormControl>
                <Input type="text" placeholder="jobNumber" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Job Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Location Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="address.address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address1</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Address 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="taxAddress.address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Address 1</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Tax Address 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="jobAttention"
          render={({ field }) => (
            <FormItem>
              <FormLabel>jobAttention</FormLabel>
              <FormControl>
                <Input type="text" placeholder="jobAttention" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>typeId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="typeId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="supervisorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>supervisorId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="supervisorId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="salesTaxStateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>salesTaxStateId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="salesTaxStateId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="jobPayrollTaxStateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>jobPayrollTaxStateId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="jobPayrollTaxStateId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="hoursCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>hoursCategoryId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="hoursCategoryId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name={`jobTier.${0}.tierId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Tier id</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Job Tier Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

<FormField
          control={form.control}
          name={`jobTier.${0}.tierValue`}
          render={({ fields }) => (
            <FormItem>
              <FormLabel>Job Tier id</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Job Tier Value" {...fields} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

<FormField
          control={form.control}
          name={`jobTier.${0}.tierValueDescription`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Tier id</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Job Tier Value Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />


<FormField
          control={form.control}
          name="hoursCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>hoursCategoryId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="hoursCategoryId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="taxesInsuranceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>taxesInsuranceId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="taxesInsuranceId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>

<FormField
          control={form.control}
          name={`jobTier.${0}.tierId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Tier id</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Job Tier Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

<FormField
          control={form.control}
          name={`customFields.${0}.fieldNumber`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Fields Num</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

<FormField
          control={form.control}
          name={`customFields.${0}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Fields Value</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Custom Fields value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />



<FormField
          control={form.control}
          name="isAvalaraClient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>isAvalaraClient</FormLabel>
              <FormControl>
                <Input type="text" placeholder="isAvalaraClient" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>




<FormField
          control={form.control}
          name="regionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region ID2</FormLabel>
              <FormControl>
                <Select key={field.value} onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.id.toString()}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>


<FormField
          control={form.control}
          name="branchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>branchId</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Branch Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>


<FormField
          control={form.control}
          name="timeKeepingJob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>timeKeepingJob</FormLabel>
              <FormControl>
                <Input type="text" placeholder="timeKeepingJob" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>



        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Customer ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="timeSheetTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Sheet Type ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Time Sheet Type ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />


        <Submit />
        {state?.error && <pre className="text-red-500 text-sm">{JSON.stringify(state.error, null, 2)}</pre>}
    </form>
    </Form>


    </div>
  );
}
