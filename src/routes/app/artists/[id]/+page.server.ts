import type { Artist } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`artists/${params.id}`);
	const artist = await getPagedData<Artist>(endpoint, locals.auth);

	return {
		artist
	};
};
