import { auth } from "@/lib/auth";
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from "next/server";
import Salestaxstateid, { SalestaxstateidDocument } from "@/models/Salestaxstateid";

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


    let getSalesTaxStateId: SalestaxstateidDocument[] = [];
    console.log('getSalesTaxStateId: first attempt', getSalesTaxStateId);

    if (!id) {
        getSalesTaxStateId = await Salestaxstateid.find();
    } else {
        getSalesTaxStateId = await Salestaxstateid.find({ id: id });
    }

    if (!getSalesTaxStateId || getSalesTaxStateId.length === 0 && id) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }

    // Return the fetched service data
    const transformedData = getSalesTaxStateId.map(salesTaxStateId => {
      return {
        id: salesTaxStateId.id,
        name: salesTaxStateId.name,
      }
    })
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching the Service:', error);
    return NextResponse.json({ error: 'Failed to fetch the selected Sales Tax State Id' }, { status: 500 });
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
    console.log('POST request body:', { name, id });
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
    const updatedService = await Salestaxstateid.findOneAndUpdate(
      { id },
      { name },
      { new: true, upsert: true },
    );

    if (!updatedService) {
      return NextResponse.json({ error: 'Salestaxstateid not found or update failed' }, { status: 404 });
    }

    // Return the updated service data
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update Sales Tax State ID' }, { status: 500 });
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
    const result = await Salestaxstateid.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Salestaxstateid not found' }, { status: 404 });
    }

    // Return a success message
    return NextResponse.json({ message: 'Salestaxstateid deleted successfully' });
  } catch (error) {
    console.error('Error deleting salestaxstateid:', error);
    return NextResponse.json({ error: 'Failed to delete Salestaxstateid' }, { status: 500 });
  }
}
