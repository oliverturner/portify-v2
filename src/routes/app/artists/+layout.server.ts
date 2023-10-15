import type { Page, Artist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApi } from "$lib/server/api";

const endpoints = {
	top: getEndpoint(`me/top/artists`, { time_range: "long_term", limit: 25 }),
	following: getEndpoint(`me/following`, { type: "artist", limit: 25 }),
};

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log({ following: endpoints.following });

	const [artists, following] = await Promise.all([
		queryApi<Page<Artist>>(endpoints.top, locals.auth),
		queryApi<{ artists: Page<Artist> }>(endpoints.following, locals.auth),
	]);

	return {
		artists,
		following,
	};
};
