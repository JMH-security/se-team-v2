import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const sessionCookie = request.cookies.get("better-auth.session_token");

	// Check if user is trying to access protected routes
	if (request.nextUrl.pathname.startsWith("/seteam")) {
		if (!sessionCookie) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/seteam/:path*"],
};
