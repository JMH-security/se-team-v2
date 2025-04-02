import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const customerNumber = searchParams.get('customerNumber');

    const headerValues = {
        "Ocp-apim-subscription-key": process.env.WT_SUB_KEY || '',
        TenantID: process.env.WT_TENANT_DEV_ID || '',
    };

    try {
        const res = await fetch(
            `https://apim-teamsoftware-cus-prd.azure-api.net/wtnextgen/accounts/v1/api/receivables/invoices?customerNumber=${customerNumber}`,
            {
                method: "GET",
                headers: headerValues,
            }
        );
        
        const data = await res.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching invoices:", error);
        return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
    }
} 