import { Job } from '@/types/job';
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox'

interface JobSearchBarProps {
  jobs: Job[]; 
  onFilter: (filteredJobs: Job[]) => void;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({ jobs, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeJobs, setActiveJobs] = useState(true);
  const [inactiveJobs, setInactiveJobs] = useState(false)


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter jobs based on the search term
    const filteredJobs = jobs.filter(job =>
      job?.jobId?.toLowerCase().includes(value.toLowerCase()) ||
      job?.jobNumber?.toString().includes(value.toLowerCase()) ||
      job?.jobDescription?.toLowerCase().includes(value.toLowerCase())
    );

    // Update the filtered list in the parent component
    onFilter(filteredJobs);
  };

  const handleActiveClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setActiveJobs(value);

    // Filter jobs based on the search term
    const filteredJobs = jobs.filter(job =>
      job?.typeId === 1
    );

    // Update the filtered list in the parent component
    onFilter(filteredJobs);
  };

  const handleInactiveClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setActiveJobs(value);

    // Filter jobs based on the search term
    const filteredJobs = jobs.filter(job =>
      job?.typeId === 0

    );

    // Update the filtered list in the parent component
    onFilter(filteredJobs);
  };


  return (
    <>
    <div className="flex flex-row grow p-2 ml-2 mr-2 bg-secondary rounded">
      <label className="flex grow input input-bordered items-center gap-2">
        <input
          type="text"
          className="flex grow bg-secondary px-2 text-primary"
          placeholder="Type Here to Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center m-1">
        <Checkbox id="activeJobs" onClick={handleActiveClick} />
        <label htmlFor="activeJobs" className="m-1">
          Active
        </label>
      </div>
      <div className="flex flex-row items-center m-1">
        <Checkbox className="" id="inactiveJobs" onClick={handleInactiveClick}/>
        <label htmlFor="inactiveJobs" className="m-1">
          Inactive
        </label>
      </div>
    </div>
    </>);
};

export default JobSearchBar;
