import type { Artist, Track, Albums, Page } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApi } from "$lib/server/api";

export { actions } from "$lib/actions";

function getEndpoints(artistId: string) {
	const sharedParams = { market: "from_token", limit: 10 };
	const sharedUrl = `artists/${artistId}`;

	return {
		artist: getEndpoint(sharedUrl),
		topTracks: getEndpoint(`${sharedUrl}/top-tracks`, sharedParams),
		albums: getEndpoint(`${sharedUrl}/albums`, sharedParams),
		appearsOn: getEndpoint(`${sharedUrl}/albums`, {
			...sharedParams,
			include_groups: "appears_on",
		}),
		relatedArtists: getEndpoint(`${sharedUrl}/related-artists`),
	};
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoints = getEndpoints(params.id);
	const [artist, topTracks, albums, appearsOn, relatedArtists] = await Promise.all([
		queryApi<Artist>(endpoints.artist, locals.auth),
		queryApi<Track[]>(endpoints.topTracks, locals.auth),
		queryApi<Page<Albums>>(endpoints.albums, locals.auth),
		queryApi<Page<Albums>>(endpoints.appearsOn, locals.auth),
		queryApi<Artist[]>(endpoints.relatedArtists, locals.auth),
	]);

	return {
		artist,
		topTracks,
		albums,
		appearsOn,
		relatedArtists,
	};
};
