import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.CONNECTIONSTRING!);
const db = client.db();

const ALLOWED_DOMAINS = ["securityengineersinc.com", "seiteam.com"];

export const auth = betterAuth({
	database: mongodbAdapter(db),
	socialProviders: {
		microsoft: {
			clientId: process.env.ENTRA_APP_ID!,
			clientSecret: process.env.ENTRA_SECRET!,
			tenantId: process.env.ENTRA_TENANT_ID,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		},
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "user",
			},
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					const domain = user.email.split("@")[1];
					if (!ALLOWED_DOMAINS.includes(domain)) {
						return false; // Block user creation
					}
					return { data: { ...user, role: "user" } };
				},
			},
		},
	},
});

export type Session = typeof auth.$Infer.Session;
