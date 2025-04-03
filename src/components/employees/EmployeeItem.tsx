"use client";

import { redirect } from "next/navigation";
import { Employee } from "@/app/types/employee";

export default function EmployeeItem({
  employeeId,
  lastName,
  employeeNumber,
  statusDescription,
  locationId,
  supervisorId
}: Employee) {
  const handleDetailsClick = () => {
    redirect(`/seteam/employees/${employeeId}`);
  };

  return (
    <>
    
      <div>
        <div className="flex flex-row bg-gray-900 p-1">
          <div className="flex flex-row grow items-center">
            <li
              key={employeeId}
              className="flex grow items-center text-white"
            >
              <div className="m-2 p-2 min-w-24 border-slate-500 border-solid border-2">
                {employeeNumber}
              </div>
              <div className="m-2 p-2 min-w-80 border-slate-700 border-solid border-2">{lastName}</div>
              <div className="m-2 p-2 border-slate-700 border-solid border-2">{statusDescription}</div>
              <div className="m-2 p-2 min-w-24 border-slate-700 border-solid border-2">{locationId}</div>
              <div className="m-2 p-2 min-w-24 border-slate-700 border-solid border-2">{supervisorId}</div>
            </li>
            <div className="flex m-2 justify-end">
                <button onClick={handleDetailsClick} className="btn btn-info">
                  Employee Details
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
