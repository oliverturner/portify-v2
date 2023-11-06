import type { Page, Artist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { getSpotifyEndpoint, mergeParams } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

const apiParams: Record<string, unknown> = {
	type: "artist",
	limit: 25,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getSpotifyEndpoint(`me/following`, mergeParams(apiParams, url));
	const { artists } = await queryApi<{ artists: Page<Artist> }>(endpoint);

	return json(artists);
}
