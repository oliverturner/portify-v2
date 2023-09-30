import type { Artist } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint, getPagedData } from "$lib/utils/data";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`artists/${params.id}`);
	const artist = await getPagedData<Artist>(endpoint, locals.auth);

	return {
		artist
	};
};
