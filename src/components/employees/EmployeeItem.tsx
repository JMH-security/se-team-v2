"use client";

import { redirect } from "next/navigation";
import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";


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
        <div className="flex flex-row grow bg-muted border border-inherit border-2 p-1 rounded-sm">
          <div className="flex flex-row grow items-center">
            <li
              key={employeeId}
              className="flex flex-row grow items-center text-inherit"
            >
              <div className="flex flex-row flex-none m-2">
                {employeeNumber}
              </div>
              <div className="m-2 p-2 min-w-80 ">{lastName}</div>
              <div className="m-2 p-2">{statusDescription}</div>
              <div className="m-2 p-2 min-w-24 ">{locationId}</div>
              <div className="m-2 p-2 min-w-24 ">{supervisorId}</div>
            </li>
            <div className="flex p-2 justify-end">
                <Button onClick={handleDetailsClick} className="btn btn-info text-secondary">
                  Employee Details
                </Button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
