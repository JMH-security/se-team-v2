import { auth } from "@/lib/auth";
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from "next/server";
import Branch, { BranchDocument } from "@/models/Branch";

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

    // Fetch branch data by id (dynamic ID from the URL)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let getBranch: BranchDocument[] = [];

    if (!id) {
        getBranch = await Branch.find();
    } else {
        getBranch = await Branch.find({ id: id });
    }

    if (!getBranch || getBranch.length === 0 && id) {
      return NextResponse.json({ success: false, message: 'Branch not found' }, { status: 404 });
    }

    // Return the fetched branch data
    const transformedData = getBranch.map(branch => {
      return {
        id: branch.id,
        name: branch.name,
      }
    })
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching the Branch:', error);
    return NextResponse.json({ error: 'Failed to fetch the selected Branch' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid or missing branch ID' }, { status: 400 });
    }

    // Establish DB connection
    await connectDB();

    // Update the branch in the database
    const updatedRegion = await Branch.findOneAndUpdate(
      { id },
      { name },
      { new: true, upsert: true}
    );


    if (!updatedRegion) {
      return NextResponse.json({ error: 'Region not found or update failed' }, { status: 404 });
    }

    // Return the updated branch data
    return NextResponse.json(updatedRegion);
  } catch (error) {
    console.error('Error updating branch:', error);
    return NextResponse.json({ error: 'Failed to update Branch' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing branch ID' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Delete the branch from the database
    const result = await Branch.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
    }

    // Return a success message
    return NextResponse.json({ message: 'Region deleted successfully' });
  } catch (error) {
    console.error('Error deleting branch:', error);
    return NextResponse.json({ error: 'Failed to delete Branch' }, { status: 500 });
  }
}