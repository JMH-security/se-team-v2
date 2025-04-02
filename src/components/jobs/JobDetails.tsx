  'use client';
  
  import { useState } from 'react';
  import { Job } from '@/types/job';
  import { JobScheduleList } from '@/components/jobs/JobScheduleList';
  import { Button } from '../ui/button';
  
  interface JobDetailsProps {
      job: Job;
  }
  
  export function JobDetails({ job }: JobDetailsProps) {
      const [showSchedules, setShowSchedules] = useState(false);
      const jobArray = job.data[0].results[0]
      console.log(jobArray)

      return (
          <div className="p-6">
              <div className="bg-gp text-primary p-6 rounded-lg mb-6">
                  <h1 className="bg-gp text-2xl font-bold text-black mb-4">{jobArray.jobDescription}</h1>
                  <div className="bg-gp grid grid-cols-2 gap-4">
                      <div>
                          <p>Job Number: {jobArray.jobNumber}</p>
                          <p>Job Address: {jobArray.address?.jobAddress1}</p>
                          <p>{jobArray.address?.jobAddress2}</p>
                          <p>{jobArray.address?.jobCity}, {jobArray.address?.jobState} {jobArray.address?.jobZip}</p>
                          <p>Phone: {jobArray.phone1}</p>
                      </div>
                      <div>
                          {jobArray.jobTiers?.map((tier) => (
                              <p key={tier.tierID}>Tier {tier.tierID} : {tier.tierValueDescription} : {tier.value}</p>
                          )
                          )}
                      </div>
                  </div>
              </div>
  
              <div className="flex gap-4">
                  <Button
                      onClick={() => setShowSchedules(!showSchedules)}
                      className="bg-secondary text-black px-6 py-2 rounded"
                  >
                      View Schedules
                  </Button>
                  <Button
                      className="bg-secondary text-black px-6 py-2 rounded"
                  >
                      View Budgets
                  </Button>
                  <Button
                      className="bg-secondary text-black px-6 py-2 rounded"
                  >
                      View Assigned Employees
                  </Button>
              </div>
  
              {showSchedules && <JobScheduleList jobNumber={jobArray.jobNumber} />}
          </div>
      );
  } 
 
 
 
