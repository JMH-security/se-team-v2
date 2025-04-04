import { auth } from "@/lib/auth";
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from "next/server";
import Supervisor, { SupervisorDocument } from "@/models/Supervisor";

// Handle GET requests
export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  const session = auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();  // Establish DB connection

    // Fetch supervisor data by id (dynamic ID from the URL)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let getSupervisor: SupervisorDocument[] = [];

    if (!id) {
        getSupervisor = await Supervisor.find();
    } else {
        getSupervisor = await Supervisor.find({ id: id });
    }

    if (!getSupervisor || getSupervisor.length === 0 && id) {
      return NextResponse.json({ success: false, message: 'Supervisor not found' }, { status: 404 });
    }

    // Return the fetched supervisor data
    const transformedData = getSupervisor.map(supervisor => {
      return {
        id: supervisor.id,
        name: supervisor.name,
      }
    })
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching the Supervisor:', error);
    return NextResponse.json({ error: 'Failed to fetch the selected Supervisor' }, { status: 500 });
  }
}



// Handle POST requests
export async function POST(req: NextRequest) {

  const session = auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Parse the JSON body from the request
    const { name, id } = await req.json();

    // Validate the input
    if (!name) {
      return NextResponse.json({ error: 'Bad Request. name must be provided' }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Invalid or missing supervisor ID' }, { status: 400 });
    }

    // Establish DB connection
    await connectDB();

    // Update the supervisor in the database
    const updatedSupervisor = await Supervisor.findOneAndUpdate(
      { id },
      { name },
      { new: true, upsert: true },
    );

    if (!updatedSupervisor) {
      return NextResponse.json({ error: 'Supervisor not found or update failed' }, { status: 404 });
    }

    // Return the updated supervisor data
    return NextResponse.json(updatedSupervisor);
  } catch (error) {
    console.error('Error updating supervisor:', error);
    return NextResponse.json({ error: 'Failed to update Supervisor' }, { status: 500 });
  }
}



// Handle DELETE requests
export async function DELETE(req: NextRequest) {

  const session = auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing supervisor ID' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Delete the supervisor from the database
    const result = await Supervisor.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Supervisor not found' }, { status: 404 });
    }

    // Return a success message
    return NextResponse.json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    console.error('Error deleting supervisor:', error);
    return NextResponse.json({ error: 'Failed to delete Supervisor' }, { status: 500 });
  }
}
