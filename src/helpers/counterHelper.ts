import connectDB from "@/lib/db";
import { Counter } from "@/models/Counter";

/**
 * Return the next job index.
 * Behavior:
 * - If no counter exists, create it so the first returned index is minJob.
 * - If a counter exists but its index < minJob, bump it so the next returned index is minJob.
 * - Otherwise, atomically increment and return the new index.
 * NEED TO WORK ON THIS SOME - A.I. DID THIS.
 */
export async function getNextJobNumber(): Promise<number> {
	await connectDB();
	const minJob = 2000;

	try {
		// Try to get the counter document
		const existing = (await Counter.findOne({ _id: "jobCounter" }).lean()) as {
			index?: number;
			prefix?: string;
		} | null;

		if (!existing) {
			// Create the counter document directly to avoid update-operator conflicts
			try {
				const created = await Counter.create({
					_id: "jobCounter",
					prefix: "JNA-",
					index: minJob,
				});
				console.log("Created counter document:", created);
				return created.index;
			} catch (err: unknown) {
				// If another process created the counter concurrently, fall through to the increment step
				const e = err as { code?: number };
				if (e && e.code === 11000) {
					console.log(
						"Counter created concurrently by another process, falling back to increment."
					);
				} else {
					throw err;
				}
			}
		}

		// If counter exists but is below minJob, set it to (minJob) so the next increment returns minJob
		const existingIndex = existing?.index ?? 0;
		const existingPrefix = existing?.prefix ?? "JNA-";

		if (existingIndex < minJob) {
			// Set to minJob-1 so the following increment returns minJob
			const setResult = await Counter.findByIdAndUpdate(
				{ _id: "jobCounter" },
				{ $set: { index: minJob - 1, prefix: existingPrefix } },
				{ new: true }
			).exec();
			console.log("Bumped existing counter result:", setResult);
		}

		// Atomically increment and return
		const updated = await Counter.findOneAndUpdate(
			{ _id: "jobCounter" },
			{ $inc: { index: 1 } },
			{ new: true }
		).exec();
		console.log("Increment result:", updated);

		return (updated && (updated as { index?: number }).index) || minJob;
	} catch (error) {
		console.error("Error getting next job number:", error);
		throw error;
	}
}

// Convenience wrapper used by the API route
export async function addCounterIndex(): Promise<{ jobIndex: number }> {
	await connectDB();
	try {
		const jobNumberIndex = await getNextJobNumber();
		return { jobIndex: jobNumberIndex };
	} catch (error) {
		console.error("Error Getting Job Index", error);
		throw error;
	}
}
