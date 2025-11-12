// app/api/counter/route.ts

import { NextResponse } from "next/server";
import { addCounterIndex } from "@/helpers/counterHelper";
import connectDB from "@/lib/db";

export async function POST() {
	try {
		await connectDB();
		const jobNumIndex = await addCounterIndex();

		console.log("jobNumIndex:", jobNumIndex);

		const prefix = jobNumIndex.prefix || "JNA-";
		const jobNumber = prefix.concat(jobNumIndex.index.toString());
		return NextResponse.json({ success: true, newJob: jobNumber });
	} catch (error) {
		console.error("Error adding job:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to add job" },
			{ status: 500 }
		);
	}
}
