import type { Page, Artist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { getSpotifyEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

const apiParams: Record<string, unknown> = {
	type: "artist",
	limit: 25,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const after = url.searchParams.get("after");
	const limit = url.searchParams.get("limit") ?? apiParams.limit;

	if (after) apiParams.after = after;
	if (limit) apiParams.limit = limit;

	const endpoint = getSpotifyEndpoint(`me/following`, apiParams);

	const { artists } = await queryApi<{ artists: Page<Artist> }>(endpoint);

	return json(artists);
}
