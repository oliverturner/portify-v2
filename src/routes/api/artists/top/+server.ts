import type { Page, Artist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { mergeParams } from "$lib/utils/data.js";
import { getEndpoint } from "$lib/utils/spotify.js";
import { queryApiFn } from "$lib/server/api";

const getDefaultParams = () => ({
	time_range: "short_term",
	limit: 25,
	offset: 0,
});

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getEndpoint(`me/top/artists`, mergeParams(getDefaultParams(), url));
	const artists = await queryApi<Page<Artist>>(endpoint);

	return json(artists);
}
