import type { Artist, SimplifiedArtist } from "$lib/typings/spotify";
import type { AuthRequest } from "lucia";

function buildUrl(path: string, params: Record<string, unknown> = {}, offset: number = 0) {
	const defaultParams = { limit: 50 };
	const url = new URL(`v1/${path}`, "https://api.spotify.com");

	for (const [key, value] of Object.entries({ ...defaultParams, ...params, offset })) {
		url.searchParams.set(key, String(value));
	}

	return url;
}

export function getEndpoint(
	path: string,
	params: Record<string, unknown> = {},
	offset: number = 0,
) {
	return buildUrl(path, params, offset).toString();
}

export async function getPagedData<T>(endpoint: string, auth: AuthRequest) {
	const session = await auth.validate();

	if (!session) return null;

	try {
		const res = await fetch(endpoint, {
			headers: { Authorization: `Bearer ${session.user.spotifyAccessToken}` },
		});

		if (res.ok === false) {
			throw new Error("Failed to fetch data", {
				cause: res,
			});
		}

		const data = (await res.json()) as T;

		return data;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log("endpoint", endpoint);
		console.error(error.message);
		return null;
	}
}

export function getArtistNames(artists: (Artist | SimplifiedArtist)[] = []) {
	return artists.map((artist) => artist.name).join(", ");
}
