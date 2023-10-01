import type { Page, Playlist } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals }) => {
	const endpoint = getEndpoint(`me/playlists`);
	const playlists = await getPagedData<Page<Playlist>>(endpoint, locals.auth);

	return {
		playlists,
	};
};
