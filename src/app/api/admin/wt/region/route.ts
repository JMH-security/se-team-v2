import { auth } from "@/lib/auth";
import { connectDB } from '@/lib/db'
import Region from '@/models/Region'
import { NextRequest, NextResponse } from "next/server";

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

    // Fetch region data by regionId (dynamic ID from the URL)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let getRegion: any[] = [];

    if (!id) {
      getRegion = await Region.find();
    } else {
      getRegion = await Region.find({ id: id });
    }

    if (!getRegion || getRegion.length === 0 && id) {
      return NextResponse.json({ success: false, message: 'Region not found' }, { status: 404 });
    }

    // Return the fetched region data
    const transformedData = getRegion.map(region => {
      return {
        id: region.id,
        name: region.name,
        contact: region.contact,
      }
    })
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching the Region:', error);
    return NextResponse.json({ error: 'Failed to fetch the selected Region' }, { status: 500 });
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
    const { name, contact, id } = await req.json();

    // Validate the input
    if (!name || !contact) {
      return NextResponse.json({ error: 'Bad Request. regionName and regionContact must be provided' }, { status: 400 });
    }


    if (!id) {
      return NextResponse.json({ error: 'Invalid or missing region ID' }, { status: 400 });
    }

    // Establish DB connection
    await connectDB();

    // Update the region in the database
    const updatedRegion = await Region.findOneAndUpdate(
      { id },
      { name, contact },
      { new: true, upsert: true },
    );


    if (!updatedRegion) {
      return NextResponse.json({ error: 'Region not found or update failed' }, { status: 404 });
    }

    // Return the updated region data
    return NextResponse.json(updatedRegion);
  } catch (error) {
    console.error('Error updating region:', error);
    return NextResponse.json({ error: 'Failed to update Region' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing region ID' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Delete the region from the database
    const result = await Region.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Region not found' }, { status: 404 });
    }

    // Return a success message
    return NextResponse.json({ message: 'Region deleted successfully' });
  } catch (error) {
    console.error('Error deleting region:', error);
    return NextResponse.json({ error: 'Failed to delete Region' }, { status: 500 });
  }
}