import type { Page, Playlist } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getData } from "$lib/utils/data";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const playlists = await getData<Page<Playlist>>(
		"me/playlists?limit=50",
		session.user.spotifyAccessToken,
	);

	return {
		spotifyUsername: session.user.spotifyUsername,
		playlists,
	};
};
