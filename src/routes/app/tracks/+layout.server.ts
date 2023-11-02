import type { Page, Track } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { getTrackAudioFeatures } from "$lib/utils/track";
import { queryApiFn } from "$lib/server/api";

const apiParams = {
	time_range: "short_term",
};

export const load: LayoutServerLoad = async ({ locals }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { tracks: null };

	const endpoint = getEndpoint("me/top/tracks", apiParams);
	const tracks = await queryApi<Page<Track>>(endpoint);
	const metadata = await getTrackAudioFeatures({ tracks: tracks.items, queryApi });

	return {
		tracks,
		metadata,
	};
};
