import type { PageServerLoad } from "./$types";
import type { Track, RecommendationsResponse } from "$lib/typings/spotify";

import { getSpotifyEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";
import { getTrackAudioFeatures } from "$lib/utils/track";
export { actions } from "$lib/actions";

const apiParams = {
	market: "from_token",
};

function getEndpoints(track: Track) {
	const url = "recommendations";

	return {
		recommendedArtists: getSpotifyEndpoint(url, {
			...apiParams,
			seed_artists: track.artists.map((artist) => artist.id),
		}),
		recommendedTracks: getSpotifyEndpoint(url, { ...apiParams, seed_tracks: track?.id }),
	};
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (queryApi) {
		const track = await queryApi<Track>(getSpotifyEndpoint(`tracks/${params.id}`, apiParams));
		const endpoints = getEndpoints(track);

		try {
			const [trackMetadata, recommendedArtists, recommendedTracks] = await Promise.all([
				getTrackAudioFeatures({ tracks: [track], queryApi }),
				queryApi<RecommendationsResponse>(endpoints.recommendedArtists),
				queryApi<RecommendationsResponse>(endpoints.recommendedTracks),
			]);

			const relatedMetadata = await getTrackAudioFeatures({
				tracks: [...(recommendedTracks?.tracks ?? []), ...(recommendedArtists?.tracks ?? [])],
				queryApi,
			});

			return {
				track,
				recommendedArtists,
				recommendedTracks,
				metadata: {
					...trackMetadata,
					...relatedMetadata,
				},
			};
		} catch (error) {
			console.log({ error });

			return {
				track,
			};
		}
	}
};
