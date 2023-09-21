import type { LayoutServerLoad } from "./$types";

import { getData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return { playlists: { items: [] } };

	const playlists = await getData("me/playlists?limit=50", session.user.spotifyAccessToken);

	return {
		userId: session.user.userId,
		spotifyUsername: session.user.spotifyUsername,
		spotifyAccessToken: session.user.spotifyAccessToken,
		playlists,
	};
};
