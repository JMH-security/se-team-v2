import { auth } from "@/lib/auth";
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from "next/server";
import Service, { ServiceDocument } from "@/models/Service";

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

    // Fetch service data by id (dynamic ID from the URL)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let getService: ServiceDocument[] = [];

    if (!id) {
        getService = await Service.find();
    } else {
        getService = await Service.find({ id: id });
    }

    if (!getService || getService.length === 0 && id) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }

    // Return the fetched service data
    const transformedData = getService.map(service => {
      return {
        id: service.id,
        name: service.name,
      }
    })
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching the Service:', error);
    return NextResponse.json({ error: 'Failed to fetch the selected Service' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid or missing service ID' }, { status: 400 });
    }

    // Establish DB connection
    await connectDB();

    // Update the service in the database
    const updatedService = await Service.findOneAndUpdate(
      { id },
      { name },
      { new: true, upsert: true },
    );

    if (!updatedService) {
      return NextResponse.json({ error: 'Service not found or update failed' }, { status: 404 });
    }

    // Return the updated service data
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update Service' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing service ID' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Delete the service from the database
    const result = await Service.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Return a success message
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete Service' }, { status: 500 });
  }
}
