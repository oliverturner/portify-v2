import type { Artist } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getData } from "$lib/utils/data";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const artist = await getData<Artist>(
		`artists/${params.id}?limit=50`,
		session.user.spotifyAccessToken,
	);

	return {
		artist,
	};
};
