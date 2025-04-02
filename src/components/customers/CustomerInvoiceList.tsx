"use client"

import { useEffect, useState } from "react";

interface Invoice {
    invoiceNumber: number;
    invoiceDate: string;
    jobNumber: string;
    invoiceTotal: number;
    poNumber: string;
    collectionStatus: string;
}


//---- NEED TO IMPLEMENT PAGINATION AT SOME POINT AND REDO TABLE USING SHADCN UI TABLE -----//
interface Pagination {
    currentPage: number;
    totalPages: number;
    totalCount: number;
}

const Invoices = ({ customerNumber }: { customerNumber: string }) => {

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortedInvoices, setSortedInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        const getInvoices = async () => {
    
        try {
            const invoiceResponse = await fetch(`/api/invoices?customerNumber=${customerNumber}`)
        if (!invoiceResponse.ok) {
            throw new Error(`Failed to fetch invoices.  status: ${invoiceResponse.status}`);
        }
        const invoiceData = await invoiceResponse.json()
        const sortedInvoices = (invoiceData.data?.[0]?.results || [])
                        .sort((a: Invoice, b: Invoice) => new Date(b.invoiceDate).getTime() - new Date(a.invoiceDate).getTime())
                        .slice(0, 25);
        setSortedInvoices(sortedInvoices)
        setLoading(false)
        } catch (error: any) {
            setError(error.message)
            setLoading(false)
        } finally { setLoading(false) }
    }

    getInvoices()
    }, [customerNumber]);

    // if (loading) return <div>Loading invoices...</div>;
    if (loading) { return <div>Loading Invoices...</div>}
    if (error) { return <div>Error: {error}</div>;}
    if (sortedInvoices.length === 0) { return <div>No invoices found.</div>;}
   
    return (
        <div className="mt-6">
            <div className="flex flex-wrap grow">
                <h2 className="grow text-xl font-bold mb-4">Invoices</h2>
                <h2 className="text-xl mb-4">Customer: {customerNumber}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Invoice</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Date</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Job</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">PO Number</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Amount</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedInvoices.map((invoice: Invoice) => (
                            <tr key={invoice.invoiceNumber} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                                <td className="py-3 px-4">
                                    {new Date(invoice.invoiceDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">{invoice.jobNumber}</td>
                                <td className="py-3 px-4">{invoice.poNumber || '-'}</td>
                                <td className="py-3 px-4">${invoice.invoiceTotal.toFixed(2)}</td>
                                <td className="py-3 px-4">{invoice.collectionStatus || 'Paid'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 

export default Invoices;