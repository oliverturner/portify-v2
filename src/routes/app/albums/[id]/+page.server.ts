import type { SimplifiedAlbum } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getData } from "$lib/utils/data";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const album = await getData<SimplifiedAlbum>(
		`albums/${params.id}?limit=50`,
		session.user.spotifyAccessToken,
	);

	return {
		album,
	};
};
