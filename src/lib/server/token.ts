import type { Session } from "lucia";

import prettyMS from "pretty-ms";

import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";
import { auth } from "./lucia";

const TOKEN_REFRESH_BUFFER = 3000;

// TODO How to prevent double invocation if requests overlap?

/**
 * - Request an updated accessToken
 * - Update the user record with it (which automatically adds it to the session)
 */
async function refreshUserAccessToken(session: Session) {
	const { userId, spotifyRefreshToken } = session.user;
	const authToken = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
	const body = new URLSearchParams();
	body.set("grant_type", "refresh_token");
	body.set("refresh_token", spotifyRefreshToken);

	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${authToken}`,
		},
		body: body.toString(),
	});

	if (res.ok === false) {
		throw new Error("Failed to refresh access token", { cause: res });
	}

	const data = await res.json();
	const user = await auth.updateUserAttributes(userId, {
		access_token: data.access_token,
		expires_at: Date.now() + data.expires_in * 1000 - TOKEN_REFRESH_BUFFER,
	});

	return user.spotifyAccessToken;
}

function validateUserAccessToken({ user }: Session) {
	const timeLeft = Math.floor(user.spotifyTokenExpiresAt - Date.now());
	const tokenIsValid = timeLeft > 0;

	console.log(`Token refreshing in ${prettyMS(timeLeft)}`);

	return tokenIsValid;
}

/**
 * If `session.tokenRefresh` exists, return it: it's a promise that resolves to a new access token
 * Otherwise, invoke `refreshUserAccessToken` & store the resulting promise in `session.tokenRefresh`
 * Delete `session.tokenRefresh` on completion
 */
export async function getAccessToken(session: Session | null) {
	if (!session) {
		throw new Error("No session provided");
	}

	let accessToken = session.user.spotifyAccessToken;

	if (validateUserAccessToken(session)) {
		return accessToken;
	}

	if (session.tokenRefresh) {
		return session.tokenRefresh;
	}

	session.tokenRefresh = refreshUserAccessToken(session);
	accessToken = await session.tokenRefresh;

	console.log("Token refreshed", { tokenRefresh: session.tokenRefresh });

	delete session.tokenRefresh;

	return accessToken;
}
