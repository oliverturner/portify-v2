import type { TrackItem, Track } from "$lib/typings/spotify";

function buildUrl(path: string, params: Record<string, unknown> = {}) {
	const url = new URL(`v1/${path}`, "https://api.spotify.com");

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, String(value));
	}

	return url;
}

export function getSpotifyEndpoint(path: string, params: Record<string, unknown> = {}) {
	return buildUrl(path, params).toString();
}

/**
 * Applies query params from the `next` url to the endpoint
 */
export function getAppEndpoint(next: string, endpoint: URL) {
	const url = new URL(next);
	for (const [k, v] of url.searchParams.entries()) {
		endpoint.searchParams.set(k, v);
	}

	return endpoint.toString();
}

// TODO move this into a playlist utils file
export const isTrack = (trackItem: TrackItem): trackItem is Track => {
	return trackItem?.type === "track";
};
