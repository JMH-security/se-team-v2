import connectDB from "@/lib/db";
import { Counter } from "@/models/Counter";
import { ICounter } from "@/types/counter";

//This function creates the next job number.
export async function getNextJobNumber(): Promise<ICounter> {
	await connectDB();
	const minJob = 100000;

	try {
		// Try to get the counter document
		const existing = (await Counter.findOne({
			_id: "jobCounter",
		}).lean()) as ICounter;

		if (!existing) {
			try {
				const created = await Counter.create({
					_id: "jobCounter",
					prefix: "JNA-",
					index: minJob,
				});
				return created;
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
		console.log("exIndex:", existingIndex, " exPrefix:", existingPrefix);
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
		console.log("Incremented to:", updated);

		return updated as ICounter;
	} catch (error) {
		console.error("Error getting next job number:", error);
		throw error;
	}
}

// Convenience wrapper used by the API route
export async function addCounterIndex(): Promise<ICounter> {
	await connectDB();
	console.log("Running addCounterIndex");
	try {
		const jobNumberIndex = await getNextJobNumber();
		return jobNumberIndex;
	} catch (error) {
		console.error("Error Getting Job Index", error);
		throw error;
	}
}
