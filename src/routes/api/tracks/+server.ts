import type { Page } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { injectAudio } from "$lib/utils/track";
import { getSpotifyEndpoint, mergeParams } from "$lib/utils/data";

const apiParams = {
	time_range: "short_term",
	limit: 50,
	offset: 0,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getSpotifyEndpoint("me/top/tracks", mergeParams(apiParams, url));
	const page = await queryApi<Page<AudioTrack>>(endpoint);

	page.items = await injectAudio(queryApi, page.items);

	return json(page);
}
