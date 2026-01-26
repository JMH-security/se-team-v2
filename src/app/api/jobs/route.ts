import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import LocalJob from "@/models/LocalJob";
import CustomerJobs from "@/models/CustomerJobs";
import { localJobSchema } from "@/lib/schemas/localJobSchema";
import { addCounterIndex } from "@/helpers/counterHelper";
import { ICounter } from "@/types/counter";
import { TLocalJob } from "@/types/localJob";

interface TWtJobTier {
  tierValue?: string;
  tierValueDescription?: string;
}

interface WTApiResponse {
  success: boolean;
  data?: any;
  jobNumber?: string;
  error?: string;
}

interface JobAddress {
  JobAddress1: string;
  JobAddress2: string;
  JobCity: string;
  JobState: string;
  JobZip: number;
}

interface TaxAddress {
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  Zip: number;
  Latitude?: number;
  Longitude?: number;
  LocationCode?: string;
}

interface AddressValidationResult {
  isValid: boolean;
  errors: string[];
  standardizedAddress?: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface CensusGeocodeResponse {
  result: {
    addressMatches: Array<{
      matchedAddress: string;
      coordinates: {
        x: number; // longitude
        y: number; // latitude
      };
      addressComponents: {
        streetName: string;
        city: string;
        state: string;
        zip: string;
      };
    }>;
  };
}

async function validateAddressWithApi(
  street: string,
  city: string,
  state: string,
  zip: string | number
): Promise<AddressValidationResult> {
  const errors: string[] = [];

  // Basic required field validation first
  if (!street || street.trim() === "") {
    errors.push("Street address is required");
  }
  if (!city || city.trim() === "") {
    errors.push("City is required");
  }
  if (!state || state.trim() === "") {
    errors.push("State is required");
  }
  if (!zip) {
    errors.push("ZIP code is required");
  }

  // If basic validation fails, return early
  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  try {
    // US Census Bureau Geocoder API - free, no API key required
    const params = new URLSearchParams({
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.toString().trim(),
      benchmark: "Public_AR_Current",
      format: "json",
    });

    const response = await fetch(
      `https://geocoding.geo.census.gov/geocoder/locations/address?${params.toString()}`,
      { method: "GET" }
    );

    if (!response.ok) {
      console.error("Census API error:", response.status);
      // If API fails, fall back to basic validation (already passed)
      return { isValid: true, errors: [] };
    }

    const data: CensusGeocodeResponse = await response.json();

    if (data.result.addressMatches.length === 0) {
      errors.push(
        "Address could not be verified. Please check the address and try again."
      );
      return { isValid: false, errors };
    }

    // Address is valid - return standardized data
    const match = data.result.addressMatches[0];
    return {
      isValid: true,
      errors: [],
      standardizedAddress: {
        address: match.matchedAddress,
        city: match.addressComponents.city,
        state: match.addressComponents.state,
        zip: match.addressComponents.zip,
      },
      coordinates: {
        latitude: match.coordinates.y,
        longitude: match.coordinates.x,
      },
    };
  } catch (error) {
    console.error("Address validation API error:", error);
    // If API call fails, fall back to basic validation (already passed)
    return { isValid: true, errors: [] };
  }
}

export async function GET() {
  try {
    await connectDB();
    const jobs = await LocalJob.find({});
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body: TLocalJob = await request.json();

    // Generate the next job number
    console.log("The formData body received:", body);

    if (body.jobNumber == "" || !body.jobNumber) {
      const newJob: ICounter = await addCounterIndex();
      const newJobNumber = newJob.prefix + newJob.index.toString();
      body.jobNumber = newJobNumber;
    }
    const parsed = localJobSchema.parse({ ...body });
    console.log("Parsed Job Data successfully");

    // Remove _id if it's empty or undefined - let MongoDB auto-generate it
    const { _id, ...jobData } = parsed;
    const job = new LocalJob(jobData);
    const mgoLocalJob = await job.save();

    // Remove IDs from tiers
    const wtAddTiers = mgoLocalJob.jobTiers.map(
      (tier: TWtJobTier, i: number) => ({
        tierID: i + 1,
        tierValue: tier.tierValue,
        tierValueDescription: tier.tierValueDescription,
      })
    );
    // Remove IDs from custom fields
    const wtAddCustomFields = mgoLocalJob.customFields.map((field: any) => ({
      fieldNumber: field.fieldNumber + 10, // Get rid of +10 for production
      value: field.value,
    }));

    // Build the winTeam object
    const wtJobToAdd = {} as any;

    // Build Address with correct structure
    const jobAddress: JobAddress = {
      JobAddress1: mgoLocalJob.address.jobAddress1 || "",
      JobAddress2: mgoLocalJob.address.jobAddress2 || "",
      JobCity: mgoLocalJob.address.jobCity || "",
      JobState: mgoLocalJob.address.jobState || "",
      JobZip: Number(mgoLocalJob.address.jobZip) || 0,
    };

    // Build TaxAddress with correct structure
    const taxAddress: TaxAddress = {
      Address1: mgoLocalJob.address.jobAddress1 || "",
      Address2: mgoLocalJob.address.jobAddress2 || "",
      City: mgoLocalJob.address.jobCity || "",
      State: mgoLocalJob.address.jobState || "",
      Zip: Number(mgoLocalJob.address.jobZip) || 0,
      Latitude: mgoLocalJob.address.latitude || undefined,
      Longitude: mgoLocalJob.address.longitude || undefined,
      LocationCode: mgoLocalJob.address.locationCode || undefined,
    };

    wtJobToAdd.Address = jobAddress;
    wtJobToAdd.TaxAddress = taxAddress;
    wtJobToAdd.JobNumber = mgoLocalJob.jobNumber;
    wtJobToAdd.JobDescription = mgoLocalJob.jobDescription;
    wtJobToAdd.LocationId = 210;
    wtJobToAdd.CompanyNumber = 1;
    wtJobToAdd.JobAttention = mgoLocalJob.jobAttention;
    wtJobToAdd.TypeId = mgoLocalJob.typeId;
    wtJobToAdd.SupervisorId = mgoLocalJob.supervisorId;
    wtJobToAdd.SalesTaxStateId = mgoLocalJob.salesTaxStateId;
    wtJobToAdd.JobPayrollTaxStateId = mgoLocalJob.jobPayrollTaxStateId || 1;
    wtJobToAdd.HoursCategoryId = mgoLocalJob.hoursCategoryId;
    wtJobToAdd.JobTiers = wtAddTiers;
    wtJobToAdd.TaxesInsuranceId = mgoLocalJob.taxesInsuranceId;
    wtJobToAdd.CustomFields = wtAddCustomFields;
    wtJobToAdd.IsAvalaraClient = false;
    wtJobToAdd.HoursRuleId = mgoLocalJob.hoursRuleId;
    wtJobToAdd.TimeKeepingJob = false;
    wtJobToAdd.TimeSheetTypeId = 1;

    // Validate address using US Census Bureau Geocoder API
    const addressValidation = await validateAddressWithApi(
      jobAddress.JobAddress1,
      jobAddress.JobCity,
      jobAddress.JobState,
      jobAddress.JobZip
    );

    if (!addressValidation.isValid) {
      return NextResponse.json(
        {
          error: "Address validation failed",
          details: addressValidation.errors,
        },
        { status: 400 }
      );
    }

    // Update TaxAddress with coordinates from API if available
    if (addressValidation.coordinates) {
      taxAddress.Latitude = addressValidation.coordinates.latitude;
      taxAddress.Longitude = addressValidation.coordinates.longitude;
      wtJobToAdd.TaxAddress = taxAddress;
    }

    if (wtJobToAdd) {
      const toAddBody = JSON.stringify(wtJobToAdd);
      const headerValues = {
        "Ocp-apim-subscription-key": process.env.WT_SUB_KEY || "",
        TenantId: process.env.WT_TENANT_DEV_ID || "",
      };
      const res = await fetch(`${process.env.NXT_JOB_URL}`, {
        method: "POST",
        headers: headerValues,
        body: toAddBody,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`WinTeam API error: ${res.status} - ${error}`);
      } else {
        const addedJob: WTApiResponse = await res.json();

        // Fetch jobID from WinTeam after save
        const res2 = await fetch(
          `${process.env.NXT_JOB_URL}?searchFieldName=jobNumber&searchText=${addedJob.jobNumber}`,
          {
            method: "GET",
            headers: headerValues,
          }
        );

        const fetchedJob: WTApiResponse = await res2.json();
        const fetchedJobData = fetchedJob.data[0].results[0];
        const wtJobID = fetchedJob.data[0].results[0].jobId;
        // Update MongoDB with WinTeam JobID
        const jobUpdate = await LocalJob.updateOne(
          { jobNumber: mgoLocalJob.jobNumber },
          { $set: { jobId: wtJobID } }
        );
        console.log("Updated MongoDB with WinTeam JobID:", jobUpdate);
        return NextResponse.json(fetchedJobData, { status: 201 });
      }
    } else {
      return NextResponse.json(
        { error: "Failed to Compose Job" },
        { status: 400 }
      );
    }

    // END WINTEAM ADD SECTION

    return NextResponse.json(mgoLocalJob, { status: 201 });
  } catch (error) {
    console.error("Full error details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to Compose Job", details: errorMessage },
      { status: 400 }
    );
  }
}
