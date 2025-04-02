import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Customer } from "@/types/customer"
import Customers from "@/components/customers/Customers"
import { toNumber } from "@/lib/utils"

export default async function WtCustomers() {
  const session = await auth();
  if (!session) {
    console.log("no session - reject");
    redirect("/");
    return;
  }

  try {
    const headerValues = {
      "Ocp-apim-subscription-key": process.env.WT_CUST_SUB_KEY || '',
      TenantID: process.env.WT_TENANT_DEV_ID || '',
    };
    
    const res = await fetch(`${process.env.CUSTOMER_API_URL}/api/customers`, {
      method: "GET",
      headers: headerValues,
    });
    const data = await res.json();
    
    const wtCustomers: Customer[] = data.map((customer: Customer) => ({
      ...customer,
      CustomerNumber: toNumber(customer.CustomerNumber),
      CustomerTypeId: toNumber(customer.CustomerTypeId),
      SalesmanId: toNumber(customer.SalesmanId),
    }));
    return <Customers customers={wtCustomers} />;
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
}
