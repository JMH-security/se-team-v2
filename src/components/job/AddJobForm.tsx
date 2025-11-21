// components/AddJobForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addJobSchema, AddJobFormData } from "@/lib/schemas/addJobSchema";
import { useAddJob } from "@/contexts/AddJobContext";
import { TAddJob } from "@/types/addJob";
import { Customer } from "@/types/customer";
import {
  TTier1,
  TTier2,
  TTier3,
  TTier4,
  TTier5,
  TTier6,
  TTier7,
} from "@/types/tiers";
import { useHoursRule } from "@/contexts/HoursRuleContext";
import { useHoursCategory } from "@/contexts/HoursCategoryContext";
import { useSupervisor } from "@/contexts/SupervisorContext";
import { useSalesTaxState } from "@/contexts/SalesTaxStateContext";
import { useTier1 } from "@/contexts/tiers/Tier1Context";
import { useTier2 } from "@/contexts/tiers/Tier2Context";
import { useTier3 } from "@/contexts/tiers/Tier3Context";
import { useTier4 } from "@/contexts/tiers/Tier4Context";
import { useTier5 } from "@/contexts/tiers/Tier5Context";
import { useTier6 } from "@/contexts/tiers/Tier6Context";
import { useTier7 } from "@/contexts/tiers/Tier7Context";

// import { useJobPayrollTaxState } from "@/contexts/JobPayrollTaxStateContext";
import { useTaxesInsurance } from "@/contexts/TaxesInsuranceContext";

interface AddJobFormProps {
  customer?: Customer;
  addJob?: TAddJob;
  onSuccess?: () => void;
}

export default function AddJobForm({
  customer,
  addJob,
  onSuccess,
}: AddJobFormProps) {
  const { createAddJob, updateAddJob } = useAddJob();
  const { hoursRules } = useHoursRule();
  const { hoursCategorys } = useHoursCategory();
  const { supervisors } = useSupervisor();
  const { salesTaxStates } = useSalesTaxState();
  // jobPayrollTaxStates not used in this form currently
  // const { jobPayrollTaxStates } = useJobPayrollTaxState();
  const { taxesInsurances } = useTaxesInsurance();
  const { tier1s } = useTier1();
  const { tier2s } = useTier2();
  const { tier3s } = useTier3();
  const { tier4s } = useTier4();
  const { tier5s } = useTier5();
  const { tier6s } = useTier6();
  const { tier7s } = useTier7();

  const form = useForm<AddJobFormData>({
    resolver: zodResolver(addJobSchema),
    defaultValues: {
      _id: addJob?._id || undefined,
      jobNumber: addJob?.jobNumber || "",
      jobId: addJob?.jobId || "",
      jobDescription: addJob?.jobDescription || "",
      locationId: addJob?.locationId || undefined,
      companyNumber: addJob?.companyNumber ?? undefined,
      hoursRuleId: addJob?.hoursRuleId ?? undefined,
      jobAttention: addJob?.jobAttention ?? null,
      dateToStart: addJob?.dateToStart ?? null,
      typeId: addJob?.typeId ?? null,
      phone1: addJob?.phone1 ?? null,
      phone1Description: addJob?.phone1Description ?? null,
      phone2: addJob?.phone2 ?? null,
      phone2Description: addJob?.phone2Description ?? null,
      phone3: addJob?.phone3 ?? null,
      phone3Description: addJob?.phone3Description ?? null,
      supervisorId: addJob?.supervisorId ?? null,
      taxesInsuranceId: addJob?.taxesInsuranceId ?? null,
      salesTaxStateId: addJob?.salesTaxStateId ?? null,
      jobPayrollTaxStateID: addJob?.jobPayrollTaxStateID ?? null,
      hoursCategoryID: addJob?.hoursCategoryID ?? null,
      notes: addJob?.notes ?? null,
      address: addJob?.address ?? null,
      taxAddress: addJob?.taxAddress ?? null,
      jobTiers: addJob?.jobTiers ?? [],
      customFields: addJob?.customFields ?? [],
      parentJobNumber: addJob?.parentJobNumber ?? null,
      //tier1Value: addJob?.tier1Value ?? null,
    },
  });

  const onSubmit = async (data: AddJobFormData) => {
    // Set Job to Active (typeId = 1) and Company Number to 1
    console.log("tier 1", tier1s);
    console.log("CUSTOMER?", customer);
    console.log("FORM DATA:", data);
    data.jobTiers = data.jobTiers ?? [];
    data.typeId = 1;
    data.companyNumber = 1;

    //Add customer data into custom fields
    data.customFields = data.customFields ?? [];
    data.customFields.push({
      fieldNumber: 2,
      value: customer?.CustomerID?.toString() || "",
    });
    data.customFields.push({
      fieldNumber: 3,
      value: customer?.CustomerName || "",
    });
    data.customFields.push({
      fieldNumber: 4,
      value: customer?.CustomerNumber?.toString() || "",
    });

    ///TIER CONSTRUCTION*********************************************
    //Tier 1
    const tier1Selected = data.tier1Value ?? "1";
    const tier1Match = tier1s.find((t) => t._id === tier1Selected);
    data.jobTiers.push({
      tierValue: tier1Match?.tierValue ?? "",
      tierValueDescription: tier1Match?.tierValueDescription ?? "",
    });
    //Tier 2
    const tier2Selected = data.tier2Value ?? "1";
    const tier2Match = tier2s.find((t) => t._id === tier2Selected);
    data.jobTiers.push({
      tierValue: tier2Match?.tierValue ?? "",
      tierValueDescription: tier2Match?.tierValueDescription ?? "",
    });

    //Tier 3
    const tier3Selected = data.tier3Value ?? "1";
    const tier3Match = tier3s.find((t) => t._id === tier3Selected);
    data.jobTiers.push({
      tierValue: tier3Match?.tierValue ?? "",
      tierValueDescription: tier3Match?.tierValueDescription ?? "",
    });

    //Tier 4
    const tier4Selected = data.tier4Value ?? "1";
    const tier4Match = tier4s.find((t) => t._id === tier4Selected);
    data.jobTiers.push({
      tierValue: tier4Match?.tierValue ?? "",
      tierValueDescription: tier4Match?.tierValueDescription ?? "",
    });

    //Tier5
    const tier5Selected = data.tier5Value ?? "1";
    const tier5Match = tier5s.find((t) => t._id === tier5Selected);
    data.jobTiers.push({
      tierValue: tier5Match?.tierValue ?? "",
      tierValueDescription: tier5Match?.tierValueDescription ?? "",
    });

    //Tier 6
    const tier6Selected = data.tier6Value ?? "1";
    const tier6Match = tier6s.find((t) => t._id === tier6Selected);
    data.jobTiers.push({
      tierValue: tier6Match?.tierValue ?? "",
      tierValueDescription: tier6Match?.tierValueDescription ?? "",
    });

    //Tier 7
    const tier7Selected = data.tier7Value ?? "1";
    const tier7Match = tier7s.find((t) => t._id === tier7Selected);
    data.jobTiers.push({
      tierValue: tier7Match?.tierValue ?? "",
      tierValueDescription: tier7Match?.tierValueDescription ?? "",
    });
    console.log(data.address?.jobAddress1);
    //// END TIER CONSTRUCTION*********************************************

    // use proper property names expected by schema
    // data.address = {
    //   jobAddress1: address.jobAddress1,
    //   jobAddress2: "",
    //   jobCity: "Anytown",
    //   jobState: "CA",
    //   jobZip: "12345",
    // };
    data.taxAddress = {
      address1: "123 Main st",
      address2: "",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    };
    try {
      if (addJob) {
        await updateAddJob(addJob._id, data);
      } else {
        await createAddJob(data);
        form.reset({
          jobNumber: "",
          jobDescription: "",
          jobAttention: "",
          companyNumber: undefined,
          hoursRuleId: undefined,
          supervisorId: null,
          taxesInsuranceId: null,
          salesTaxStateId: null,
          jobPayrollTaxStateID: null,
          hoursCategoryID: null,
          address: null,
          taxAddress: null,
          jobTiers: [],
          customFields: [],
          tier1Value: null,
        });
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("AddJob submit failed", err);
    }
  };

  return (
    <Form {...form}>
      <div className="container p-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid 
        lg:grid-cols-8 
        grid-cols-4 
        gap-4 
        auto-rows-min 
        grid-auto-rows-min-content"
        >
          <div className="col-span-2 lg:col-span-2 hidden">
            <FormField
              control={form.control}
              name="jobNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 lg:col-span-6">
            <FormField
              control={form.control}
              name="jobAttention"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Attention</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full row-span-2">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="">Job Description</FormLabel>
                  <FormControl className="">
                    <Textarea className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/***********************  Address Section *************************/}
          {/* data.address = {
      jobAddress1: "123 Main st",
      jobAddress2: "",
      jobCity: "Anytown",
      jobState: "CA",
      jobZip: "12345",
    }; */}

          <div className="grid lg:grid-cols-2 grid-cols-1 col-span-full gap-4 p-2 border border-slate-600 rounded-md">
            <div className="row-start-1 flex items-center justify-center mx-auto">
              <Label className="text-lg text-secondary">
                Job Service Address
              </Label>
            </div>

            <div className="row-start-2">
              <FormField
                control={form.control}
                name="address.jobAddress1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="row-start-3 lg:row-start-2">
              <FormField
                control={form.control}
                name="address.jobAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="row-start-4 lg:row-start-3">
              <FormField
                control={form.control}
                name="address.jobCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="row-start-5 lg:row-start-3">
              <FormField
                control={form.control}
                name="address.jobState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="row-start-6 lg:row-start-4">
              <FormField
                control={form.control}
                name="address.jobZip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/***********************  Selector Section *************************/}
          <div className="grid lg:grid-cols-2 grid-cols-1 col-span-full gap-4 p-2 border border-slate-600 rounded-md">
            <div className="row-start-1 flex items-center justify-center mx-auto">
              <Label className="text-lg text-secondary">SELECT OPTIONS</Label>
            </div>

            <div className="row-start-2">
              <FormField
                control={form.control}
                name="hoursRuleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Rule</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) =>
                          field.onChange(v ? Number(v) : null)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Hours Rule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {hoursRules.map((r) => (
                              <SelectItem
                                key={r._id}
                                value={r.hoursRuleId.toString()}
                              >
                                {r.hoursRuleName}
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
            <div className="row-start-3 lg:row-start-2">
              <FormField
                control={form.control}
                name="hoursCategoryID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Category</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) =>
                          field.onChange(v ? Number(v) : null)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Hours Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {hoursCategorys.map((h) => (
                              <SelectItem
                                key={h._id}
                                value={h.hoursCategoryId.toString()}
                              >
                                {h.hoursCategoryName}
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
            <div className="row-start-6 lg:row-start-4 col-start-1">
              <FormField
                control={form.control}
                name="supervisorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) =>
                          field.onChange(v ? Number(v) : null)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Supervisor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {supervisors.map((s) => (
                              <SelectItem
                                key={s._id}
                                value={s.supervisorId.toString()}
                              >
                                {s.supervisorName}
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
            <div className="row-start-4 lg:row-start-3">
              <FormField
                control={form.control}
                name="taxesInsuranceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxes / Insurance</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) =>
                          field.onChange(v ? Number(v) : null)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Taxes/Insurance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {taxesInsurances.map((t) => (
                              <SelectItem
                                key={t._id}
                                value={t.taxesInsuranceId.toString()}
                              >
                                {t.taxesInsuranceName}
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
            {/***********************  Sales Tax State ID Field *************************/}
            <div className="lg:row-start-3 row-start-5">
              <FormField
                control={form.control}
                name="salesTaxStateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Tax State</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) =>
                          field.onChange(v ? Number(v) : null)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sales Tax State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {salesTaxStates.map((s) => (
                              <SelectItem
                                key={s._id}
                                value={s.salesTaxStateId.toString()}
                              >
                                {s.salesTaxStateName}
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
          </div>

          {/***********************  TIER Selector Section *************************/}
          <div className="grid lg:grid-cols-2 grid-cols-1 col-span-full gap-4 p-2 border border-slate-600 rounded-md">
            <div className="row-start-1 flex items-center justify-center mx-auto">
              <Label className="text-lg text-secondary">SELECT TIERS</Label>
            </div>

            <div className="row-start-2">
              <FormField
                control={form.control}
                name="tier1Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Industry Type</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) => field.onChange(v ? v : null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Customer Industry Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tier1s.map((t1: TTier1) => (
                              <SelectItem key={t1._id} value={t1._id}>
                                {t1.tierValue} - {t1.tierValueDescription}
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
            <div className="row-start-3 lg:row-start-2">
              <FormField
                control={form.control}
                name="tier2Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Service</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) => field.onChange(v ? v : null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Type of Service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tier2s.map((t2: TTier2) => (
                              <SelectItem key={t2._id} value={t2._id}>
                                {t2.tierValue} - {t2.tierValueDescription}
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
            <div className="row-start-4 lg:row-start-3 col-start-1">
              <FormField
                control={form.control}
                name="tier3Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier3</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) => field.onChange(v ? v : null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Uniform Security Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tier3s.map((t3: TTier3) => (
                              <SelectItem key={t3._id} value={t3._id}>
                                {t3.tierValue} - {t3.tierValueDescription}
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
            <div className="row-start-5 lg:row-start-3">
              <FormField
                control={form.control}
                name="tier4Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier4</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) => field.onChange(v ? v : null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tier4" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tier4s.map((t4: TTier4) => (
                              <SelectItem key={t4._id} value={t4._id}>
                                {t4.tierValue} - {t4.tierValueDescription}
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

            <div className="lg:row-start-4 row-start-6">
              <FormField
                control={form.control}
                name="tier5Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier5</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) => field.onChange(v ? v : null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tier5" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tier5s.map((t5: TTier5) => (
                              <SelectItem key={t5._id} value={t5._id}>
                                {t5.tierValue} - {t5.tierValueDescription}
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
            <div className="lg:row-start-4 row-start-7">
              <FormField
                control={form.control}
                name="tier6Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier6</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) => field.onChange(v ? v : null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tier6" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tier6s.map((t6: TTier6) => (
                              <SelectItem key={t6._id} value={t6._id}>
                                {t6.tierValue} - {t6.tierValueDescription}
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

            <div className="lg:row-start-5 row-start-8">
              <FormField
                control={form.control}
                name="tier7Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier7</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          field.value !== null && field.value !== undefined
                            ? String(field.value)
                            : ""
                        }
                        onValueChange={(v) => field.onChange(v ? v : null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Tier7" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tier7s.map((t7: TTier7) => (
                              <SelectItem key={t7._id} value={t7._id}>
                                {t7.tierValue} - {t7.tierValueDescription}
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
          </div>

          {/***********************   TIER   ***************************/}

          <div className="row-start-6 grid grid-cols-1 space-x-2">
            <div className="row-start-1 flex items-center justify-center mx-auto"></div>

            <div className="row-start-1 flex items-center justify-center mx-auto"></div>

            <div className="row-start-1 flex items-center justify-center mx-auto"></div>

            <div className="row-start-1 flex items-center justify-center mx-auto"></div>

            <div className="row-start-1 flex items-center justify-center mx-auto"></div>

            <div className="row-start-1 flex items-center justify-center mx-auto"></div>

            <div className="row-start-1 flex items-center justify-center mx-auto"></div>
          </div>

          {/***********************   END OF TIERS ***************************/}
          <div className="">
            <Button className="mb-4" type="submit">
              {addJob ? "Update Job" : "Create New Job"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
