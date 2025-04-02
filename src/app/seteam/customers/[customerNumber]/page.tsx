import { CustomerDetails } from "@/components/customers/CustomerDetails"

export default async function CustomerPage({ params }: { params: { customerNumber: string } }) {
    
    const { customerNumber } = await params
     
    try {
        const headerValues = {
            "Ocp-apim-subscription-key": process.env.WT_CUST_SUB_KEY || '',
            TenantID: process.env.WT_TENANT_DEV_ID || '',
        };
        
        const res = await fetch(`${process.env.CUSTOMER_API_URL}/api/Customers/${customerNumber}`, {
            method: "GET",
            headers: headerValues,
        });
        
        const customerData = await res.json();
        
        return <CustomerDetails customer={customerData} />;
    } catch (error) {
        console.error("Error fetching customer:", error);
        return <div>Error loading customer details</div>;
    }
}