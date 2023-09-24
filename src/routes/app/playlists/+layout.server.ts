import type { Page, Playlist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const playlists = await getData<Page<Playlist>>(
		"me/playlists?limit=50",
		session.user.spotifyAccessToken,
	);

	return {
		playlists,
	};
};
