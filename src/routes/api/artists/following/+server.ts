import type { Page, Artist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { mergeParams } from "$lib/utils/data.js";
import { getEndpoint } from "$lib/utils/spotify.js";
import { queryApiFn } from "$lib/server/api";

const apiParams: Record<string, unknown> = {
	type: "artist",
	limit: 25,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getEndpoint(`me/following`, mergeParams(apiParams, url));
	const { artists } = await queryApi<{ artists: Page<Artist> }>(endpoint);

	return json(artists);
}
