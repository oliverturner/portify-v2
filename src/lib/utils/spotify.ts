function buildUrl(path: string, params: Record<string, unknown> = {}) {
	const url = new URL(`v1/${path}`, "https://api.spotify.com");

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, String(value));
	}

	return url;
}

export function getEndpoint(path: string, params: Record<string, unknown> = {}) {
	return buildUrl(path, params).toString();
}
