import type { AuthRequest } from "lucia";
import { getAccessToken } from "./token";

export async function queryApiFn(authRequest: AuthRequest) {
	const session = await authRequest.validate();
	const accessToken = await getAccessToken(session);

	return async function queryApi<T>(endpoint: string, options: RequestInit = {}) {
		const res = await fetch(endpoint, {
			...options,
			headers: {
				"cache-control": "public, max-age=3600",
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (res.ok === false) {
			throw new Error("Failed to fetch data", { cause: res });
		}

		return res.json() as Promise<T>;
	};
}

export async function requestPlayback(
	authRequest: AuthRequest,
	endpoint: string,
	options: RequestInit = {},
) {
	const session = await authRequest.validate();
	const accessToken = await getAccessToken(session);
	const res = await fetch(endpoint, {
		...options,
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	return res.status;
}
