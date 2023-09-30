import type { Page, Playlist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint, getPagedData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const endpoint = getEndpoint("me/playlists");
	const playlists = await getPagedData<Page<Playlist>>(endpoint, locals.auth);

	return {
		playlists
	};
};
