import type { Page, Track } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const tracks = await getData<Page<Track>>(
		"me/top/tracks?limit=50",
		session.user.spotifyAccessToken,
	);

	return {
		tracks,
	};
};
