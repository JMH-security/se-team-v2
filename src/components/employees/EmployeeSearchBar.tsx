import { Employee } from "@/app/types/employee";
import React, { useState } from "react";

interface EmployeeSearchBarProps {
  employees: Employee[]; // Adjust the type based on your customer object structure
  onFilter: (filteredEmployees: Employee[]) => void;
}

const EmployeeSearchBar: React.FC<EmployeeSearchBarProps> = ({
  employees,
  onFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter employees based on the search term
    const filteredEmployees = employees.filter(
      (employee) =>
        employee?.employeeNumber?.toString().includes(value.toString()) ||
        employee?.lastName?.toLowerCase().includes(value.toLowerCase())
    );

    // Update the filtered list in the parent component
    onFilter(filteredEmployees);
  };

  return (

    <>
    <div className="p-4">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow text-black"
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

    {/* RESULTS TABLE HEADER */}
    <div>
      <div className="flex flex-row bg-slate-500 p-1">
        <div className="flex flex-row grow items-center">
            <div className="ml-4 p-1 min-w-24">
              EE Number
            </div>
            <div className="m-2 p-2 min-w-80">Last Name</div>
            <div className="m-2 p-2">Status</div>
            <div className="m-2 p-2 min-w-24">Location Id</div>
            <div className="m-2 p-2 min-w-24">Supervisor Id</div>
            </div>      
      </div>
    </div>
{/* END OF RESULTS TABLE HEADER */}

  </>
  );
};

export default EmployeeSearchBar;
