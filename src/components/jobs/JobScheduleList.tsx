'use client';

import { useEffect, useState } from 'react';

interface JobSchedule {
    id: number;
    scheduleDetailsID: number;
    jobNumber: string;
    employeeNumber: string | null;
    jobPostDetailID: number;
    workDate: Date;
    inTime: Date;
    outTime: Date;
    hours: number;
    lunch: number;
}


export function JobScheduleList({ jobNumber }: { jobNumber: string }) {
    const [schedules, setSchedules] = useState<JobSchedule[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchSchedules() {
            try {
                const params = new URLSearchParams({
                    jobNumber: jobNumber,
                });

                const headerValues = {
                    "Ocp-apim-subscription-key": process.env.WT_SUB_KEY || "",
                    TenantID: process.env.WT_TENANT_DEV_ID || "",
                };
                const dateFrom="12-13-2020"
                const dateTo="12-19-2020"
                const jobNum = "11182"

                const resCheck = `http://apim.myteamsoftware.com/wtnextgen/jobs/v1/api/jobs/${jobNumber}/schedules?dateFrom=${dateFrom}&dateTo=${dateTo}`
                console.log('here is the sched URL: ',resCheck)
                
                // const res = await fetch(`/api/schedules/${jobNum}/schedules?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
                //     method: "GET",
                //     headers: headerValues
                // });

                const res = await fetch(`/api/schedules/${jobNum}/schedules?dateFrom=${dateFrom}&dateTo=${dateTo}`)
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();
                console.log(data)
                const sortedSchedules = (data.data?.[0]?.results || [])
                    .sort((a: JobSchedule, b: JobSchedule) => 
                        new Date(b.inTime).getTime() - new Date(a.inTime).getTime()
                    )
                    .slice(0, 25);
                setSchedules(sortedSchedules);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                setSchedules([]);
            } finally {
                setLoading(false);
            }
        }

        fetchSchedules();
    }, []);

    if (loading) return <div>Loading Schedules...</div>;
    console.log(jobNumber)
    if (schedules.length === 0) return <div>No Schedules found.</div>;

    return (
        <div className="mt-6">
            <div className="flex flex-wrap grow">
                <h2 className="grow text-xl font-bold mb-4">Schedules</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Schedule ID</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Work Date</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Job</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Employee Number</th>
                            <th className="text-left py-3 px-4 font-normal text-gray-600">Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{schedule.scheduleDetailsID}</td>
                                <td className="py-3 px-4">
                                    {new Date(schedule.workDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">{schedule.jobNumber}</td>
                                <td className="py-3 px-4">{schedule.employeeNumber || '-'}</td>
                                <td className="py-3 px-4">${schedule.hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 