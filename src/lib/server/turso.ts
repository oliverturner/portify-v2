import type { SQLiteTable } from "drizzle-orm/sqlite-core/table";
type TableKey = keyof typeof schema;

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { getTableName } from "drizzle-orm";

import { TURSO_DB_URL, TURSO_DB_AUTH_TOKEN } from "$env/static/private";
import * as schema from "../../../drizzle/schema.ts";

function getTableNames(schema: Record<TableKey, SQLiteTable>) {
	const tableNames = {} as Record<TableKey, string>;
	for (const [key, table] of Object.entries(schema)) {
		tableNames[key as TableKey] = getTableName(table);
	}

	return tableNames;
}

export const libSqlClient = createClient({
	url: TURSO_DB_URL,
	authToken: TURSO_DB_AUTH_TOKEN,
});

export const tableNames = getTableNames(schema);

export const db = drizzle(libSqlClient, { schema });
