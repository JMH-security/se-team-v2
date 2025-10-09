import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Supervisor, { SupervisorDocument } from "@/models/Supervisor_archive";

// Handle GET requests
export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");

	const session = auth();

	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		await connectDB(); // Establish DB connection

		// Fetch supervisor data by id (dynamic ID from the URL)

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let getSupervisor: SupervisorDocument[] = [];

		if (!id) {
			getSupervisor = await Supervisor.find();
			console.log("The getSupervisor: ", getSupervisor);
		} else {
			getSupervisor = await Supervisor.find({ id: id });
		}

		if (!getSupervisor || (getSupervisor.length === 0 && id)) {
			return NextResponse.json(
				{ success: false, message: "Supervisor not found" },
				{ status: 404 }
			);
		}

		// Return the fetched supervisor data
		const transformedData = getSupervisor.map((supervisor) => {
			return {
				//_id: supervisor._id,
				id: supervisor.id,
				name: supervisor.name,
			};
		});
		console.log("The transformedData: ", transformedData);
		return NextResponse.json(transformedData);
	} catch (error) {
		console.error("Error fetching the Supervisor:", error);
		return NextResponse.json(
			{ error: "Failed to fetch the selected Supervisor" },
			{ status: 500 }
		);
	}
}

// Handle POST requests
export async function POST(req: NextRequest) {
	const session = auth();
	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		// Parse the JSON body from the request
		const { name, id, _id } = await req.json(); //Good to go
		console.log(name, id, _id);

		// Validate the input
		if (!name) {
			return NextResponse.json(
				{ error: "Bad Request. name must be provided" },
				{ status: 400 }
			);
		}

		if (!id) {
			return NextResponse.json(
				{ error: "Invalid or missing supervisor ID" },
				{ status: 400 }
			);
		}

		if (!_id) {
			// Establish DB connection
			await connectDB();
			const item = await Supervisor.insertOne({ name: name, id: id });

			if (!item) {
				return NextResponse.json(
					{ error: "Unable to add Supervisor" },
					{ status: 404 }
				);
			}
			return NextResponse.json({ success: true, data: item });
		}

		// Establish DB connection
		await connectDB();
		const item = await Supervisor.findByIdAndUpdate(_id, {
			name: name,
			id: id,
		});

		if (!item) {
			return NextResponse.json(
				{ error: "Supervisor not found or update failed" },
				{ status: 404 }
			);
		}
		return NextResponse.json({ success: true, data: item });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to update Supervisor" },
			{ status: 500 }
		);
	}
}

// // Handle edit - PUT requests

// export async function PUT(req: NextRequest) {

//   const session = auth();
//   if (!session) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     // Parse the JSON body from the request
//     const { name, id, _id } = await req.json();  //Good to go

//     // Validate the input
//     if (!name) {
//       return NextResponse.json({ error: 'Bad Request. name must be provided' }, { status: 400 });
//     }

//     if (!id) {
//       return NextResponse.json({ error: 'Invalid or missing supervisor ID' }, { status: 400 });
//     }

//     // Establish DB connection
//     await connectDB();

//     const item = await Supervisor.findByIdAndUpdate(_id, req.body, {
//       new: true,
//       reunvalidators: true,
//      })

//      if (!item) {
//       return NextResponse.json({ error: 'Supervisor not found or update failed' }, { status: 404 });
//      }
//      res.status(200).json({ success: true, data: item });
//     } catch (error) {
//   }
// }

// Handle DELETE requests
export async function DELETE(req: NextRequest) {
	const session = auth();

	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		const { id } = await req.json();

		if (!id) {
			return NextResponse.json(
				{ error: "Missing supervisor ID" },
				{ status: 400 }
			);
		}

		// Connect to the database
		await connectDB();

		// Delete the supervisor from the database
		const result = await Supervisor.deleteOne({ id: id });

		if (result.deletedCount === 0) {
			return NextResponse.json(
				{ error: "Supervisor not found" },
				{ status: 404 }
			);
		}

		// Return a success message
		return NextResponse.json({ message: "Supervisor deleted successfully" });
	} catch (error) {
		console.error("Error deleting supervisor:", error);
		return NextResponse.json(
			{ error: "Failed to delete Supervisor" },
			{ status: 500 }
		);
	}
}
