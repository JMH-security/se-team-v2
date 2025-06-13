"use client"

import { useEffect, useState, useRef } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { sampleFormSchema } from "@/lib/formSchemas/sampleFormSchema"
import { Region } from "@/types/regions"

import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { entityConfig } from "@/components/wt/entityConfig"



//********** BEGIN SAMPLE FORM COMPONENT ***************/

export const SampleForm = ({

      onDataAction: (data: z.infer<typeof sampleFormSchema>) => Promise<{
        message: string;
        res_data?: z.infer<typeof sampleFormSchema>;
      }>;
      onFormAction: (prevState: FormData) => Promise<{
        message: string;
        res_data?: z.infer<typeof sampleFormSchema>;
      }>;
    }) => {
           
      const [state, formAction] = useFormState(onFormAction, {
        message: "",
      })


//********** GET REGION DATA FROM DB  ********************/
// const [regions, setRegions] = useState<Region[]>([]);
// useEffect(() => {
//   getRegions();
// }, []); 
// const getRegions = async () => {
//   try {
//     const res = await fetch(entityConfig.regions.endpointUrl, { method: "GET" });
//     const data = await res.json();
//     setRegions(data);
//   } catch (error) {
//     console.error("Error fetching regions", error);
//   }
// };
//********** END GET REGION DATA FROM DB ********************/


  //*************************** define constant to pass to form that contains react-hook-form ****************/
     //Here we define sampleForm using the react-hook-form library - useForm()
     //We use zodResolver to validate the form data against the sampleFormSchema
     //Default values MUST be set for all fields in the schema

  const sampleForm = useForm<z.infer<typeof sampleFormSchema>>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      first: "",
      last: "",
     email: "",
     regionId: "",  
    },    
  })
  
  

  const onSubmit = async (data: z.infer<typeof sampleFormSchema>) => {


    const formData = new FormData();
    formData.append("first", data.first);
    formData.append("last", data.last);
    formData.append("email", data.email);
    formData.append("regionId", data.regionId);
    

    fetch("/api/jobForm", {
      method: "POST", 
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("The Data:",  data))
    
  

    // Handle the form submission here
  }


  //*********************** onSubmit - function to run via handlesubmit ******************/
  
  // const onSubmit = async (data: z.infer<typeof sampleFormSchema>) => {
  //   fetch("/api/job", {
  //     method: "POST", 
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))  
  

  //   // Handle the form submission here
  // }
  
  //*******************************End of onSubmit function  *****************************/
    


    return (
      <div className="flex m-16">

      <Form {...sampleForm}>
        <form 
          onSubmit={sampleForm.handleSubmit(onSubmit)}
          className="space-y-8" >
          <div className="flex flex-wrap max-w-2xl gap-4">
            <FormField 
              control={sampleForm.control} 
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>Your Email Address!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={sampleForm.control} 
              name="first"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First</FormLabel>
                  <FormControl>
                    <Input placeholder="First" {...field} />
                  </FormControl>
                  <FormDescription>Your First Name!!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField 
              control={sampleForm.control} 
              name="last"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last</FormLabel>
                  <FormControl>
                    <Input placeholder="Last" {...field} />
                  </FormControl>
                  <FormDescription>Your Last Name!!!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
                      control={sampleForm.control}
                      name="regionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region ID2</FormLabel>
                          <FormControl>
                            <Select key={field.value} onValueChange={field.onChange} {...field} disabled={regions.length === 0}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={regions.length === 0 ? "Fetching Region" : "Select a Region" }/>
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





            
        </div>  
        <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    )
}

