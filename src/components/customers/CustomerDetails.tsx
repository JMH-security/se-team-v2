'use client';

import { useState } from 'react';
import { Customer } from '@/types/customer';
import Invoices from "@/components/customers/CustomerInvoiceList";
import JobForm from '@/components/jobs/form/JobForm'
import { Button } from '../ui/button';
import { AddJob } from '@/components/jobCreate/AddJob';

interface CustomerDetailsProps {
    customer: Customer;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
    const [showInvoices, setShowInvoices] = useState(false);
    const [showJobAddForm, setShowJobAddForm] = useState(false);
    console.log("customer details", customer)

    return (
        <div className="p-6">
            <div className="bg-gp text-primary p-6 rounded-lg mb-6">
                <h1 className="bg-gp text-2xl font-bold mb-4">{customer.CustomerName}</h1>
                <div className="bg-gp grid grid-cols-2 gap-4">
                    <div>
                        <p>Customer Number: {customer.CustomerNumber}</p>
                        <p>Address: {customer.Address?.Address1}</p>
                        {customer.Address?.Address2 && <p>{customer.Address.Address2}</p>}
                        <p>{customer.Address?.City}, {customer.Address?.State} {customer.Address?.Zip}</p>
                        <p>Phone: {customer.Phone}</p>
                        {customer.Fax && <p>Fax: {customer.Fax}</p>}
                    </div>
                    <div>
                        {customer.CustomFields?.map((field) => (
                            <p key={field.fieldNumber}>Field {field.fieldNumber}: {field.value}</p>
                        )
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
           
                <Button
                    className="bg-secondary text-black px-6 py-2 rounded"
                >
                    View Jobs
                </Button>
                <Button
                    onClick={() => setShowJobAddForm(!showJobAddForm)}
                    className="bg-secondary text-black px-6 py-2 rounded"
                >
                    Add New Job
                </Button>
                <Button
                    onClick={() => setShowInvoices(!showInvoices)}
                    className="bg-secondary text-black px-6 py-2 rounded"
                >
                {showInvoices ? 'Close Invoices' : 'Invoices'}
                </Button>

            </div>

            {showInvoices && <Invoices customerNumber={customer.CustomerNumber?.toString() || ''} />}
            {showJobAddForm && <JobForm customer={customer.CustomerID} />}
            <AddJob customerId='12345'/>
        </div>
    );
} 