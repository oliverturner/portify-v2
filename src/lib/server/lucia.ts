import fs from "fs";

import sqlite from "better-sqlite3";
import { lucia } from "lucia";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { sveltekit } from "lucia/middleware";
import { spotify } from "@lucia-auth/oauth/providers";

import { dev } from "$app/environment";
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIRECT_URI,
} from "$env/static/private";

const db = sqlite(":memory:");
db.exec(fs.readFileSync("schema.sql", "utf8"));

export const auth = lucia({
	adapter: betterSqlite3(db, {
		user: "user",
		session: "user_session",
		key: "user_key",
	}),
	middleware: sveltekit(),
	env: dev ? "DEV" : "PROD",
	getUserAttributes: (data) => {
		return {
			spotifyUsername: data.username,
			spotifyAccessToken: data.access_token,
			spotifyRefreshToken: data.refresh_token,
		};
	},
});

export const spotifyAuth = spotify(auth, {
	clientId: SPOTIFY_CLIENT_ID,
	clientSecret: SPOTIFY_CLIENT_SECRET,
	redirectUri: SPOTIFY_REDIRECT_URI,
	scope: [
		"user-top-read",
		"user-follow-read",
		"user-library-read",
		"user-modify-playback-state",
		"playlist-read-private",
	],
});

export type Auth = typeof auth;
