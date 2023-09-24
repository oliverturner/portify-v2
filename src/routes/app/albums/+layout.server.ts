import type { Page, SavedAlbum } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "./$types";

import { getData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const albums = await getData<Page<SavedAlbum>>(
		"me/albums?limit=50",
		session.user.spotifyAccessToken,
	);

	return {
		albums,
	};
};
