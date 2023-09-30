import type { SimplifiedAlbum } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint, getPagedData } from "$lib/utils/data";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`albums/${params.id}`);
	const album = await getPagedData<SimplifiedAlbum>(endpoint, locals.auth);

	return {
		album,
	};
};
