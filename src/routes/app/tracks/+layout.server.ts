import type { Page, Track } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getSpotifyEndpoint } from "$lib/utils/data";
import { getAudioFeatures } from "$lib/utils/track";
import { queryApiFn } from "$lib/server/api";

const apiParams = {
	time_range: "short_term",
};

// TODO: load from API instead
export const load: LayoutServerLoad = async ({ locals }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { tracks: null };

	const endpoint = getSpotifyEndpoint("me/top/tracks", apiParams);
	const tracks = await queryApi<Page<Track>>(endpoint);
	const metadata = await getAudioFeatures({ tracks: tracks.items, queryApi });

	return {
		tracks,
		metadata,
	};
};
