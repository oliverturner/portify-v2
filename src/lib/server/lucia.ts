import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { spotify } from "@lucia-auth/oauth/providers";
import { libsql } from "@lucia-auth/adapter-sqlite";

import { dev } from "$app/environment";
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIRECT_URI,
} from "$env/static/private";

import { libSqlClient, tableNames } from "./turso.ts";

console.log({ tableNames });

export const auth = lucia({
	adapter: libsql(libSqlClient, tableNames),
	middleware: sveltekit(),
	env: dev ? "DEV" : "PROD",
	getUserAttributes: (data) => {
		return {
			spotifyUsername: data.username,
			spotifyAccessToken: data.access_token,
			spotifyRefreshToken: data.refresh_token,
			spotifyAccessExpiresAt: data.access_expires_at,
		};
	},
	getSessionAttributes: (): { tokenRefreshing?: Promise<string> } => ({}),
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
