import { EmployeeDetails } from '@/components/employees/EmployeeDetails';



async function EmployeePage({ params }: { params: { employeeid: string }}) {
    const { employeeid } = await params
  
            try {
                const headerValues = {
                    "Ocp-apim-subscription-key": process.env.WT_SUB_KEY || '',
                    TenantID: process.env.WT_TENANT_DEV_ID || '',
                };
                
                const res = await fetch(`${process.env.EE_PROFILE_API_URL}${employeeid}`, {
                    method: "GET",
                    headers: headerValues,
                });
                
                const ee = await res.json();
                const eeData = ee.data[0];

                console.log('EEdata', eeData)
                return <EmployeeDetails employee={eeData} />;
            } catch (error) {
                    console.error("Error fetching employee profile:", error);
                return <div>Error loading employee details</div>;
            }
}

export default EmployeePage
