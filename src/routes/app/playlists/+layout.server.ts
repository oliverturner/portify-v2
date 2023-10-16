import type { Page, Playlist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { playlists: null };

	const endpoint = getEndpoint("me/playlists", { limit: 50 });
	const playlists = await queryApi<Page<Playlist>>(endpoint);

	return {
		playlists,
	};
};
