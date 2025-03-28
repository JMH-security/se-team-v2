"use client"

import { useState } from "react";
import CustomerItem from "@/components/customers/CustomerItem"
import CustomersSearchBar from "@/components/customers/CustomersSearchBar";
import { Customer } from "@/types/customers";

interface CustomersProps {
    customers: Customer[];
}

const Customers: React.FC<CustomersProps> = ({ customers }) => {
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);

    return (
        <>
            <CustomersSearchBar customers={customers} onFilter={setFilteredCustomers} />
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
        </>
    );
}

export default Customers;