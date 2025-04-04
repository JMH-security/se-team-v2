"use client";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";

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
        redirect(`/seteam/customers/${customerId}`);
    };

    return (
        <>
            <div>
                <div className="flex flex-row grow bg-muted border border-inherit border-2 p-1 rounded-sm">
                    <div className="flex flex-row grow items-center">
                        <li key={customerId} className="flex flex-row items-center text-inherit grow">
                            <div className="flex flex-row flex-none m-2">
                                {customerNumber}
                            </div>
                            <div className="flex grow m-2">{customerName}</div>
                            <div className="p-2">
                                <Button
                                    onClick={handleDetailsClick}
                                    className="btn btn-info text-secondary"
                                >
                                    Customer Details
                                </Button>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
        </>
    );
}
