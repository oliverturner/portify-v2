import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

const userPreferences = {
	notation: "camelot",
	theme: "dark",
};

export const user = sqliteTable("users", {
	id: text("id").primaryKey(),
	username: text("username").notNull(),
	accessToken: text("access_token").notNull(),
	refreshToken: text("refresh_token").notNull(),
	accessExpiresAt: blob("access_expires_at", { mode: "bigint" }).notNull(),
	preferences: blob("preferences", { mode: "json" }).default(JSON.stringify(userPreferences)),
});

export const session = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	activeExpires: blob("active_expires", { mode: "bigint" }).notNull(),
	idleExpires: blob("idle_expires", { mode: "bigint" }).notNull(),
});

export const key = sqliteTable("user_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: text("hashed_password"),
});
