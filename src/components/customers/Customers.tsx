"use client"

import { useState } from "react";
import CustomerItem from "./CustomerItem";
import CustomerSearchBar from "@/components/customers/CustomersSearchBar";
import { Customer } from "@/types/customer";

interface CustomersProps {
    customers: Customer[];
}

const Customers: React.FC<CustomersProps> = ({ customers }) => {
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);

    return (
        <>
            <div className="flex flex-row-reverse"><CustomerSearchBar customers={customers} onFilter={setFilteredCustomers} /></div>
            <h1 className="ml-8 pb-2 font-bold text-2xl">Customer List</h1>
            <div className="bg-gray-300">
                <ul className="space-y-4 p-4">
                    {filteredCustomers.map((customer, index) => (
                        <CustomerItem
                            key={`customer-${index}`}
                            customerId={customer.CustomerID}
                            customerNumber={customer.CustomerNumber}
                            customerName={customer.CustomerName}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Customers;