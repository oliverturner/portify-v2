import type { Page, Artist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { getSpotifyEndpoint, mergeParams } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

const apiParams = {
	time_range: "short_term",
	limit: 25,
	offset: 0,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getSpotifyEndpoint(`me/top/artists`, mergeParams(apiParams, url));
	const artists = await queryApi<Page<Artist>>(endpoint);

	return json(artists);
}