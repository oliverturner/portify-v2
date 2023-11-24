import type { Page } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api.js";
import { injectAudio } from "$lib/utils/track.js";
import { mergeParams } from "$lib/utils/data.js";
import { getEndpoint } from "$lib/utils/spotify.js";

const getDefaultParams = () => ({
	time_range: "short_term",
	limit: 50,
	offset: 0,
});

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getEndpoint("me/top/tracks", mergeParams(getDefaultParams(), url));
	const page = await queryApi<Page<AudioTrack>>(endpoint);

	page.items = await injectAudio(queryApi, page.items);

	return json(page);
}
