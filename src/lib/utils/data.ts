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
 * Merges the query params from the url into the `defaults` object
 *
 * @example
 * input: { limit: 25, offset: 0 }, `<url>?time_range=short_term&offset=50`
 * output: { time_range: "short_term", limit: 25, offset: 50 }
 */
export function mergeParams(defaults: Record<string, unknown>, url: URL) {
	for (const [key, value] of url.searchParams.entries()) {
		defaults[key] = value;
	}

	return defaults;
}

/**
 * Applies query params from the `next` url to the endpoint
 *
 * @example
 * input: `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=25&offset=0`
 * output: `/artists/top?time_range=short_term&limit=25&offset=0`
 */
export function getAppEndpoint(next: string, endpoint: URL) {
	const url = new URL(next);
	for (const [k, v] of url.searchParams.entries()) {
		endpoint.searchParams.set(k, v);
	}

	return endpoint.toString();
}
