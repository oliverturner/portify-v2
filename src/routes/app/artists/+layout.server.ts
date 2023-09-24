import type { Page, Artist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const artists = await getData<Page<Artist>>("me/top/artists?limit=50", session.user.spotifyAccessToken);

	return {
		artists,
	};
};
