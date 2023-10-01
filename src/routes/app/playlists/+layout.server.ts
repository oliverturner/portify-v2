import type { Page, Playlist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals }) => {
	const endpoint = getEndpoint("me/playlists");
	const playlists = await getPagedData<Page<Playlist>>(endpoint, locals.auth);

	return {
		playlists
	};
};
