import type { AuthRequest } from "lucia";

let controller = new AbortController();
let signal = controller.signal;

/**
 * TODO: Refresh token and re-run request
 *
 * If the cause was that the token expired call refreshSession:
 * - Request an updated accessToken
 * - Update the user record with it
 * - Add it to the session, issue a new signal and re-run the request
 *
 * If cause was that the refreshToken was revoked or expired, log out user
 *
 * If cause was that the signal was aborted, *somehow* wait for the new token to
 * be fetched and re-run request
 */
async function refreshAccessToken(refreshToken: string) {
	controller.abort();

	const res = await fetch("/api/refresh", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refreshToken }),
	});

	if (res.ok === false) {
		throw new Error("Failed to refresh session", { cause: res });
	}

	const data = (await res.json()) as { accessToken: string };

	controller = new AbortController();
	signal = controller.signal;

	return data;
}

export async function queryApiFn(authRequest: AuthRequest) {
	const session = await authRequest.validate();

	if (!session) return null;

	return async function queryApi<T>(endpoint: string, options: RequestInit = {}) {
		const req = new Request(endpoint, {
			...options,
			signal,
			headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
		});

		let res = await fetch(req);

		try {
			if (res.ok === false) {
				throw new Error("Failed to fetch data", { cause: res });
			}

			const data = (await res.json()) as T;

			return data;
		} catch (error) {
			console.log(error);

			/**
			 * TODO: Refresh token and re-run request
			 *
			 * If the cause was that the token expired call refreshSession
			 * If cause was that the refreshToken was revoked or expired, log out user
			 * If cause was that the signal was aborted, *somehow* wait for the new token to be fetched
			 * Re-run request
			 */
			if (res.status === 401) {
				console.log(401, res.statusText);
				const accessToken = await refreshAccessToken(session.user.spotifyRefreshToken);
				req.headers.set("Authorization", `Bearer ${accessToken}`);

				res = await fetch(req);

				if (res.ok === false) {
					console.log("Failed to fetch data after refreshing token", { cause: res });

					return null;
				}

				const data = (await res.json()) as T;

				return data;
			}

			return null;
		}
	};
}

export async function requestPlayback(
	authRequest: AuthRequest,
	endpoint: string,
	options: RequestInit = {},
) {
	const session = await authRequest.validate();

	if (!session) return 401;

	const res = await fetch(endpoint, {
		...options,
		headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
	});

	return res.status;
}
