"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function doLogout() {
	const headersList = await headers();

	await auth.api.signOut({
		headers: headersList,
	});

	redirect("/");
}

export async function getSession() {
	const headersList = await headers();

	return await auth.api.getSession({
		headers: headersList,
	});
}
