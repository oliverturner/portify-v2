import type { AuthRequest } from "lucia";

// import { auth } from "$lib/server/lucia";

const controller = new AbortController();
const signal = controller.signal;

export async function queryApi<T>(endpoint: string, authRequest: AuthRequest) {
	const session = await authRequest.validate();

	if (!session) return null;

	try {
		const res = await fetch(endpoint, {
			headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
			signal,
		});

		if (res.ok === false) {
			// Status codes: https://developer.spotify.com/documentation/web-api/concepts/api-calls#response-status-codes
			if (res.status === 401) {
				// TODO: Refresh token and re-run request
				// const user = await auth.updateUserAttributes(session.sessionId, null);
				// console.log({ user });
				console.log(401, res.statusText);
			}

			if (res.status === 403) {
				// Need to extend scope: https://developer.spotify.com/documentation/web-api/concepts/scopes
				console.log(403, res.statusText);
			}

			if (res.status === 429) {
				// Rate limit exceeded: https://developer.spotify.com/documentation/web-api/concepts/rate-limits
				console.log(429, res.statusText);
			}

			throw new Error("Failed to fetch data", {
				cause: res,
			});
		}

		const data = (await res.json()) as T;

		return data;
	} catch (error) {
		console.log(JSON.stringify({ endpoint, error, session }, null, 2));

		return null;
	}
}

export async function queryApiFn(authRequest: AuthRequest) {
	const session = await authRequest.validate();

	if (!session) return null;

	return async function queryApi<T>(endpoint: string) {
		const res = await fetch(endpoint, {
			headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
			signal,
		});

		if (res.ok === false) {
			controller.abort();
			throw new Error("Failed to fetch data", { cause: res });
		}

		const data = (await res.json()) as T;

		return data;
	};
}
