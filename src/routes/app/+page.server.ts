import type { Page, Playlist } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { playlists: null };

	const endpoint = getEndpoint(`me/playlists`);
	const playlists = await queryApi<Page<Playlist>>(endpoint);

	return {
		playlists,
	};
};
