import type { Playlist } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { getSpotifyEndpoint } from "$lib/utils/data";

const apiParams = {
	limit: 50,
	offset: 0,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const offset = Number(url.searchParams.get("offset")) ?? 0;
	const endpoint = getSpotifyEndpoint("me/playlists", { ...apiParams, offset });
	const playlists = await queryApi<Playlist>(endpoint);

	return json(playlists);
}
