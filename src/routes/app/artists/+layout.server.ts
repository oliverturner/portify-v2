import type { Page, Artist, FollowedArtists } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

const endpoints = {
	top: getEndpoint(`me/top/artists`, { time_range: "long_term", limit: 25 }),
	following: getEndpoint(`me/following`, { type: "artist", limit: 25 }),
};

export const load: LayoutServerLoad = async ({ locals }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { artists: null, following: null };

	const [artists, following] = await Promise.all([
		queryApi<Page<Artist>>(endpoints.top),
		queryApi<FollowedArtists>(endpoints.following),
	]);

	return {
		artists,
		following,
	};
};
