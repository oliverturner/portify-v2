import type { Playlist } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getData } from "$lib/utils/data";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const playlist = await getData<Playlist>(`playlists/${params.id}?limit=50`, session.user.spotifyAccessToken);

	return {
		playlist,
	};
};
