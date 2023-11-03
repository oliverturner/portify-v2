import type { Page, Artist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { getSpotifyEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

const apiParams = {
	type: "artist",
	limit: 25,
	offset: 0,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const offset = url.searchParams.get("offset") ?? apiParams.offset;
	const limit = url.searchParams.get("limit") ?? apiParams.limit;
	const endpoint = getSpotifyEndpoint(`me/following`, { ...apiParams, offset, limit });

	const artists = await queryApi<Page<Artist>>(endpoint);

	return json(artists);
}
