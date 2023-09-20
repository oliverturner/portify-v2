import type { LayoutServerLoad } from "./$types";

import { redirect } from "@sveltejs/kit";

import { getData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");

	const playlists = await getData("me/playlists?limit=50", session.user.spotifyAccessToken);

	return {
		userId: session.user.userId,
		spotifyUsername: session.user.spotifyUsername,
		spotifyAccessToken: session.user.spotifyAccessToken,
		playlists,
	};
};
