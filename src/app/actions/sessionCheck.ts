// This file is responsible for checking the session of the user and redirecting them if they are not authenticated.
// It also connects to the database and retrieves the user's role from the database.

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/models/User"; // Ensure User is imported

export default async function SessionCheck() {
  const session = await auth();

  if (!session) {
    console.log("No session - reject");
    redirect("/");
    return Promise.reject("No session");
  } else {
    await connectDB();

    let sessionUser = null;
    let sessionUserRole = null;

    if (session?.user?.email) {
      // Query the user's role from the database
      sessionUser = await User.findOne({ email: session.user.email }).select("-password");
      sessionUserRole = sessionUser?.role;
      return sessionUserRole;
    }
    return Promise.resolve("No session user");
  
  }
}
