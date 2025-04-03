"use client";

import { Employee } from "@/types/employee";
import { useState } from "react";
import EmployeeItem from "./EmployeeItem";
import EmployeeSearchBar from "./EmployeeSearchBar";

interface EmployeeProps {
  employees: Employee[];
}

const Employees: React.FC<EmployeeProps> = ({ employees }) => {
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);

  return (
    <>
      <EmployeeSearchBar
        employees={employees}
        onFilter={setFilteredEmployees}
      />
      <ul className="space-y-4 p-4">
        {filteredEmployees.map((employee, index) => (
          <EmployeeItem
            key={`ee-${index}`}
            employeeId={employee.employeeId}
            employeeNumber={employee.employeeNumber}
            lastName={employee.lastName}
            statusDescription={employee.statusDescription}
            locationId={employee.locationId}
            supervisorId={employee.supervisorId}
          />
        ))}
      </ul>
    </>
  );
};

export default Employees;
