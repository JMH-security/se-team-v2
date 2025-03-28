import SessionCheck from "@/app/actions/sessionCheck";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Image from "next/image";

export default async function Customer() {

  // Verify the user has a valid session prior to rendering the page
  const sessionRole = await SessionCheck()


  return (
    <>
          <h1 className="text-black">Logged In Role {sessionRole} </h1>
    </>
  );
};

