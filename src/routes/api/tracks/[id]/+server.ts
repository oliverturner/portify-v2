import type { RecommendationsResponse } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app.js";

import { injectAudio } from "$lib/utils/track.js";
import { getEndpoint } from "$lib/utils/spotify.js";
import { queryApiFn } from "$lib/server/api.js";
import { json } from "@sveltejs/kit";

const apiParams = {
	market: "from_token",
};

function getEndpoints(track: AudioTrack) {
	const url = "recommendations";

	return {
		recommendedArtists: getEndpoint(url, {
			...apiParams,
			seed_artists: track.artists.map((artist) => artist.id),
		}),
		recommendedTracks: getEndpoint(url, { ...apiParams, seed_tracks: track?.id }),
	};
}

export const GET = async ({ locals, params }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (queryApi) {
		const trackRaw = await queryApi<AudioTrack>(getEndpoint(`tracks/${params.id}`, apiParams));
		const endpoints = getEndpoints(trackRaw);

		const [recommendedArtistsRaw, recommendedTracksRaw] = await Promise.all([
			queryApi<RecommendationsResponse>(endpoints.recommendedArtists),
			queryApi<RecommendationsResponse>(endpoints.recommendedTracks),
		]);

		const [[track], recommendedArtists, recommendedTracks] = await Promise.all([
			injectAudio(queryApi, [trackRaw]),
			injectAudio(queryApi, recommendedArtistsRaw.tracks),
			injectAudio(queryApi, recommendedTracksRaw.tracks),
		]);

		return json({
			track,
			recommendedArtists,
			recommendedTracks,
		});
	}
};
