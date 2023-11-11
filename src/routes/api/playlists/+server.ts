import type { Playlist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { mergeParams } from "$lib/utils/data";
import { getEndpoint } from "$lib/utils/spotify.js";

const apiParams = {
	limit: 50,
	offset: 0,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getEndpoint("me/playlists", mergeParams(apiParams, url));
	const playlists = await queryApi<Playlist>(endpoint);

	return json(playlists);
}
