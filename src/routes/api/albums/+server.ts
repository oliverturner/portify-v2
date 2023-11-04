import type { Page, SavedAlbum } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { getSpotifyEndpoint } from "$lib/utils/data";

const apiParams = {
	market: "from_token",
	limit: 50,
	offset: 0,
};

export async function GET({ locals, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const offset = url.searchParams.get("offset") ?? 0;
	const endpoint = getSpotifyEndpoint(`me/albums`, { ...apiParams, offset });
	const albums = await queryApi<Page<SavedAlbum>>(endpoint);

	return json(albums);
}
