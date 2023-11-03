import type { Page, SavedAlbum } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "./$types";

import { getSpotifyEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { albums: null };

	const endpoint = getSpotifyEndpoint(`me/albums`, { limit: 50 });
	const albums = await queryApi<Page<SavedAlbum>>(endpoint);

	return {
		albums,
	};
};
