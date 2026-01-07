// app/api/localJobs/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import LocalJob from "@/models/LocalJob";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const prm = await params;
  const localJob = await LocalJob.findById(prm.id);
  if (!localJob)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(localJob);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await request.json();
  const prm = await params;
  const localJob = await LocalJob.findByIdAndUpdate(prm.id, data, {
    new: true,
  });
  if (!localJob)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(localJob, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const prm = await params;
  const localJob = await LocalJob.findByIdAndDelete(prm.id);
  if (!localJob)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}
