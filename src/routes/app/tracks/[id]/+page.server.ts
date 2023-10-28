import type { PageServerLoad } from "./$types";
import type { Track, RecommendationsResponse } from "$lib/typings/spotify";

import { getEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";
import { getTrackMetadata } from "$lib/utils/track";
export { actions } from "$lib/actions";

const apiParams = {
	market: "from_token",
};

function getEndpoints(track: Track) {
	const url = "recommendations";

	return {
		recommendedArtists: getEndpoint(url, {
			...apiParams,
			seed_artists: track.artists.map((artist) => artist.id),
		}),
		recommendedTracks: getEndpoint(url, { ...apiParams, seed_tracks: track?.id }),
	};
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (queryApi) {
		const track = await queryApi<Track>(getEndpoint(`tracks/${params.id}`, apiParams));
		const endpoints = getEndpoints(track);

		try {
			const [trackMetadata, recommendedArtists, recommendedTracks] = await Promise.all([
				getTrackMetadata({ tracks: [track], queryApi }),
				queryApi<RecommendationsResponse>(endpoints.recommendedArtists),
				queryApi<RecommendationsResponse>(endpoints.recommendedTracks),
			]);

			const recommendedTracksMetadata = await getTrackMetadata({
				tracks: recommendedTracks?.tracks ?? [],
				queryApi,
			});

			return {
				track,
				recommendedArtists,
				recommendedTracks,
				metadata: {
					...trackMetadata,
					...recommendedTracksMetadata,
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
