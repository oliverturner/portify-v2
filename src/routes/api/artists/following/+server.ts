import type { Page, Artist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { mergeParams } from "$lib/utils/data.js";
import { getEndpoint } from "$lib/utils/spotify.js";
import { queryApiFn } from "$lib/server/api";

const getDefaultParams = () => ({
	type: "artist",
	time_range: "long_term",
	limit: 25,
});

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const urlParams = mergeParams(getDefaultParams(), url);
	const endpoint = getEndpoint(`me/following`, urlParams);

	const res = await queryApi<{ artists: Page<Artist> }>(endpoint);

	return json(res?.artists);
}
