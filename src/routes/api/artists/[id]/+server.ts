import type { Album, Artist, Page } from "$lib/typings/spotify.js";
import type { AudioTrack } from "$lib/typings/app.js";

import { json } from "@sveltejs/kit";

import { getEndpoint } from "$lib/utils/spotify.js";
import { injectAudio } from "$lib/utils/track.js";
import { queryApiFn } from "$lib/server/api.js";

function getEndpoints(artistId: string) {
	const baseUrl = `artists/${artistId}`;
	const baseParams = { market: "from_token", limit: 10 };

	return {
		artist: getEndpoint(baseUrl, { ...baseParams, is_playable: true, is_local: false }),
		topTracks: getEndpoint(`${baseUrl}/top-tracks`, baseParams),
		albums: getEndpoint(`${baseUrl}/albums`, baseParams),
		appearsOn: getEndpoint(`${baseUrl}/albums`, {
			...baseParams,
			include_groups: "appears_on",
		}),
		relatedArtists: getEndpoint(`${baseUrl}/related-artists`),
	};
}

export const GET = async ({ locals, params }) => {
	const endpoints = getEndpoints(params.id);
	const queryApi = await queryApiFn(locals.auth);

	if (queryApi) {
		const requests = [
			queryApi<Artist>(endpoints.artist),
			queryApi<{ tracks: AudioTrack[] }>(endpoints.topTracks),
			queryApi<Page<Album>>(endpoints.albums),
			queryApi<Page<Album>>(endpoints.appearsOn),
			queryApi<{ artists: Artist[] }>(endpoints.relatedArtists),
		] as const;

		try {
			const [artist, topTracks, albums, appearsOn, related] = await Promise.all(requests);
			const tracks = await injectAudio(queryApi, topTracks?.tracks ?? []);

			return json({
				artist,
				tracks,
				albums,
				appearsOn,
				related,
			});
		} catch (error) {
			console.log(JSON.stringify({ error }, null, 2));
		}
	}
};
