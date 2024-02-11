import type { Playlist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { mergeParams } from "$lib/utils/data";
import { getEndpoint } from "$lib/utils/spotify.js";
import { DEFAULT_PARAMS } from "$lib/constants.js";

const getDefaultParams = () => ({
	...DEFAULT_PARAMS,
});

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getEndpoint("me/playlists", mergeParams(getDefaultParams(), url));
	const playlists = await queryApi<Playlist>(endpoint);

	return json(playlists);
}
