//***********************************************************/
// This file is used exclusively for the auth.js mongodb adapter
// It ensure the user, account and session info is written to
// the applicable document collections
//***********************************************************/

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTIONSTRING || "";
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

if (!uri) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let authClient: MongoClient;

if (process.env.NODE_ENV === "development") {
	let globalWithMongo = global as typeof globalThis & {
		_mongoClient?: MongoClient;
	};

	if (!globalWithMongo._mongoClient) {
		globalWithMongo._mongoClient = new MongoClient(uri, options);
	}
	authClient = globalWithMongo._mongoClient;
} else {
	authClient = new MongoClient(uri, options);
}

export default authClient;
