import type { Playlist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { getSpotifyEndpoint, mergeParams } from "$lib/utils/data";

const apiParams = {
	limit: 50,
	offset: 0,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getSpotifyEndpoint("me/playlists", mergeParams(apiParams, url));
	const playlists = await queryApi<Playlist>(endpoint);

	return json(playlists);
}
