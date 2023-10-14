import type { Artist, Track, Album, Page } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

export { actions } from "$lib/actions";

function getEndpoints(artistId: string) {
	const baseUrl = `artists/${artistId}`;
	const baseParams = { market: "from_token", limit: 10 };

	return {
		artist: getEndpoint(baseUrl),
		topTracks: getEndpoint(`${baseUrl}/top-tracks`, baseParams),
		albums: getEndpoint(`${baseUrl}/albums`, baseParams),
		appearsOn: getEndpoint(`${baseUrl}/albums`, { ...baseParams, include_groups: "appears_on" }),
		related: getEndpoint(`${baseUrl}/related-artists`),
	};
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoints = getEndpoints(params.id);
	const queryApi = await queryApiFn(locals.auth);

	if (queryApi) {
		const requests = [
			queryApi<Artist>(endpoints.artist),
			queryApi<{ tracks: Track[] }>(endpoints.topTracks),
			queryApi<Page<Album>>(endpoints.albums),
			queryApi<Page<Album>>(endpoints.appearsOn),
			queryApi<{ artists: Artist[] }>(endpoints.related),
		] as const;

		try {
			const [artist, topTracks, albums, appearsOn, related] = await Promise.all(requests);

			return {
				artist,
				topTracks,
				albums,
				appearsOn,
				related,
			};
		} catch (error) {
			// TODO: If error is 401, abort signal, refresh token and retry requests up to 3 times before redirecting to login
			// TODO: Can we use streaming to notify the client of progress?
			// TODO: Can we use a state machine to handle the transitions between active and refreshing states?
			console.log(JSON.stringify({ error }, null, 2));
			// TODO find a way to safely handle next and prev URLs, decorating with headers
		}
	}
};
