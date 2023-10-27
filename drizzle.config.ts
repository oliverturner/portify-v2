import type { Config } from "drizzle-kit";

import "dotenv/config";

export default {
	schema: "./src/lib/db/schema.ts",
	out: "./drizzle",
	driver: "turso",
	dbCredentials: {
		url: process.env.TURSO_DB_URL!,
		authToken: process.env.TURSO_DB_AUTH_TOKEN!,
	},
} satisfies Config;
