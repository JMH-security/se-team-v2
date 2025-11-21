import "server-only"; //DO WE NEED THIS DECLARATION???

import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import authClient from "@/lib/authdb";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(authClient),
  providers: [
    MicrosoftEntraID({
      clientId: process.env.ENTRA_APP_ID,
      clientSecret: process.env.ENTRA_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
          redirect_uri: process.env.ENTRA_ID_AUTH_URL,
          tenantId: process.env.ENTRA_TENANT_ID,
        },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return { role: profile.role ?? "G-user", ...profile };
      },
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
    strategy: "database",
  },
  callbacks: {
    async signIn({ user }) {
      // Restrict sign-in to users with specific email domains
      const allowedDomains = [
        "securityengineersinc.com",
        "seiteam.com",
        "gmail.com",
        "solustream.com",
      ];
      const userEmail = user?.email as string;
      const userDomain = userEmail.split("@")[1];
      const userAllowed = allowedDomains.includes(userDomain);
      return userAllowed;
    },
    async session({ session }) {
      if (session.user) {
        console.log("Session User Callback:", session.user.name);
      }
      return session;
    },
  },
});
