import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import MicrosoftEntraIdProvider from "next-auth/providers/microsoft-entra-id";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

const secret = process.env.NEXTAUTH_SECRET;

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	//adapter: MongoDBAdapter(client, options),
	providers: [
		MicrosoftEntraIdProvider({
			clientId: process.env.EntraAppID,
			clientSecret: process.env.EntraSecretValue,
			authorization: {
				params: {
					scope: "openid profile email User.Read",
					redirect_uri: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
					tenantId: process.env.EntraTenantID,
				},
			},
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user, account, profile, trigger }) {
			if (trigger === "signIn") {
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.userId;
			}
			return session;
		},
		async signIn({ user, account, profile }) {
			try {
				await connectDB();

				const userExists = await User.findOne({ email: user.email });

				if (!userExists) {
					//If user does not exist in db, create user with unauthorized role.
					await User.create({
						email: user.email,
						name: user.name,
						image: user.image,
						profile: user.profile,
						role: "unauthorized",
					});
				} else {
					const loginTime = Date.now();
					await User.updateOne(
						//if user exists, update their lastLogin time.
						{ email: user.email },
						{ $set: { lastLogin: loginTime } }
					);
				}
			} catch (error) {
				console.error(error);
			}

			// LIMIT LOGIN TO ONLY ALLOWED DOMAINS  -- Remove GMAIL before production!!
			// returns true if email domain is in array of allowedDomains.
			const allowedDomains = [
				"securityengineersinc.com",
				"seiteam.com",
				"gmail.com",
				"solustream.com",
			];
			const userEmail = profile?.email;
			const userDomain = userEmail.split("@")[1];
			const userAllowed = allowedDomains.includes(userDomain);
			return userAllowed;
		},
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth;
		},
	},
});
