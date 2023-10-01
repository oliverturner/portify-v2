import type { AuthRequest } from "lucia";

import { auth } from "$lib/server/lucia";

export async function getPagedData<T>(endpoint: string, authRequest: AuthRequest) {
	const session = await authRequest.validate();

	if (!session) return null;

	try {
		const res = await fetch(endpoint, {
			headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
		});

		if (res.ok === false) {
			const { status, statusText, url } = res;
			console.log("res.ok: false", { status, statusText, url });

			// Status codes: https://developer.spotify.com/documentation/web-api/concepts/api-calls#response-status-codes
			if (res.status === 401) {
				// TODO: Refresh token and re-run request
				const user = await auth.updateUserAttributes(session.sessionId, null);
				console.log({ user });
			}

			if (res.status === 403) {
				// Need to extend scope: https://developer.spotify.com/documentation/web-api/concepts/scopes
			}

			if (res.status === 429) {
				// Rate limit exceeded: https://developer.spotify.com/documentation/web-api/concepts/rate-limits
			}

			throw new Error("Failed to fetch data", {
				cause: res,
			});
		}

		const data = (await res.json()) as T;

		return data;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(JSON.stringify({ endpoint, error, session }, null, 2));

		return null;
	}
}
