import { JobDetails } from '@/components/jobs/JobDetails';

export default async function JobPage({ params }: { params: { jobId: string } }) {
    
    const { jobId } = await params

    try {
        const headerValues = {
            "Ocp-apim-subscription-key": process.env.WT_SUB_KEY || '',
            TenantID: process.env.WT_TENANT_DEV_ID || '',
        };
        
        const res = await fetch(`${process.env.NXT_GET_A_JOB}${jobId}`, {
            method: "GET",
            headers: headerValues,
        });
        
        const jobData = await res.json();
        console.log("Job Data:", jobData)
        
        return <JobDetails job={jobData} />;
    } catch (error) {
        console.error("Error fetching customer:", error);
        return <div>Error loading job details</div>;
    }
}