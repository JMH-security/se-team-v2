"use client";

import { redirect } from "next/navigation";

type CustomerProps = {
    customerId: string | null;
    customerName: string | null;
    customerNumber: number | null;
};

export default function CustomerItem({
    customerId,
    customerName,
    customerNumber,
}: CustomerProps) {
    const handleDetailsClick = () => {
        redirect(`/seteam/customer/${customerId}`);
    };

    return (
        <>
            <div>
                <div className="flex flex-row grow bg-gray-900 p-1">
                    <div className="flex flex-row grow items-center">
                        <li key={customerId} className="flex flex-row items-center grow text-white">
                            <div className="flex flex-rowbadge flex-none m-2">
                                {customerNumber}
                            </div>
                            <div className="flex grow m-2">{customerName}</div>
                            <div className="p-2">
                                <button
                                    onClick={handleDetailsClick}
                                    className="btn btn-info"
                                >
                                    Customer Details
                                </button>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
        </>
    );
}
