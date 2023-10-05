import type { Page, Playlist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApi } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals }) => {
	const endpoint = getEndpoint("me/playlists");
	const playlists = await queryApi<Page<Playlist>>(endpoint, locals.auth);

	return {
		playlists
	};
};
