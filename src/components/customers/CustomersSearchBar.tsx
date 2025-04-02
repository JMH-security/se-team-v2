import { Customer } from '@/types/customer';
import React, { useState } from 'react';

interface CustomersSearchBarProps {
  customers: Customer[]; // Adjust the type based on your customer object structure
  onFilter: (filteredCustomers: Customer[]) => void;
}

const CustomerSearchBar: React.FC<CustomersSearchBarProps> = ({ customers, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter customers based on the search term
    const filteredCustomers = customers.filter(customer =>
      customer?.CustomerName?.toLowerCase().includes(value.toLowerCase()) ||
      customer?.CustomerNumber?.toString().includes(value.toLowerCase())
    );

    // Update the filtered list in the parent component
    onFilter(filteredCustomers);
  };

  return (
    <div className="p-4 ml-4 mr-4 bg-secondary min-w-xl rounded-lg">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow text-inherit font-bold"
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
  );
};

export default CustomerSearchBar;
