'use client';

import { useState } from 'react';
import { Employee } from '@/types/employee';
import { usePathname } from 'next/navigation';

interface EmployeeDetailsProps {
    employee: Employee;
}




export function EmployeeDetails({ employee }: EmployeeDetailsProps) {
    const [showCompliance, setShowCompliance] = useState(false);
    console.log(employee)



    const curPath = usePathname()
    console.log('curPath ', curPath)
    console.log('eeid ', employee.employeeId)


    return (
        <div className="p-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
                <h1 className="text-2xl font-bold mb-4">{employee.employeeNumber}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <h2>Employee Details:</h2>
                        <p>Employee Number: {employee.employeeNumber}</p>
                        <p>Name: Officer {employee.firstName} {employee.lastName}</p>
                        <p>Primary Job:  {employee.primaryJob}</p>
                    </div>
                    <div>
                    <h2>Contact Information:</h2>
                        <p>Email: {employee.emailAddress}</p>
                        <p>Cell Phone: {employee.phone1}</p>
                        <p>Address: {employee.address.address1}</p>
                        {employee.address?.address2 && <p>{employee.address.address2}</p>}
                        <p>{employee.address?.city}, {employee.address?.state} {employee.address?.zip}</p>
                    </div>
                    <div>
                        <h2>Key Dates:</h2>
                        <p>Hire Date: {employee.hireDate}</p>
                        <p>Birth Date: {employee.birthDate}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => setShowCompliance(!showCompliance)}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    Show Compliance
                </button>
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    View Jobs
                </button>
            </div>


        </div>
    );
} 