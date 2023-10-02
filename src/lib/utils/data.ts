import type { Artist, SimplifiedArtist, TrackItem, Track } from "$lib/typings/spotify";

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

export function getArtistNames(artists: (Artist | SimplifiedArtist)[] = []) {
	return artists.map((artist) => artist.name).join(", ");
}

export const isTrack = (data: TrackItem): data is Track => {
	return data.type === "track";
};
