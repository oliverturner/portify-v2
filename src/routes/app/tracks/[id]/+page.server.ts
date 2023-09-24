import type { PageServerLoad } from "./$types";

import { getData } from "$lib/utils/data";
import type { Track } from "$lib/typings/spotify";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();

	if (!session) return;

	const track = await getData<Track>(`tracks/${params.id}`, session.user.spotifyAccessToken);

	return {
		track,
	};
};
