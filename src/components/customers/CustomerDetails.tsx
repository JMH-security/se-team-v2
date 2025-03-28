'use client';

import { useState } from 'react';
import { Customer } from '@/types/customers';
import { InvoiceList } from '@/app/components/customer/InvoiceList';
import AddJobForm from '../job/addJobForm';

interface CustomerDetailsProps {
    customer: Customer;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
    const [showInvoices, setShowInvoices] = useState(false);
    const [showJobAddForm, setShowJobAddForm] = useState(false);



    return (
        <div className="p-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
                <h1 className="text-2xl font-bold mb-4">{customer.CustomerName}</h1>
                <div className="grid grid-cols-2 gap-4">
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
                <button
                    onClick={() => setShowInvoices(!showInvoices)}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    View Invoices
                </button>
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    View Jobs
                </button>
                <button
                    onClick={() => setShowJobAddForm(!showJobAddForm)}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    Add New Job
                </button>
            </div>

            {showInvoices && <InvoiceList customerNumber={customer.CustomerNumber?.toString() || ''} />}
            {showJobAddForm && <AddJobForm customer={customer} />}
        </div>
    );
} 