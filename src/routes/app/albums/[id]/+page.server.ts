import type { SimplifiedAlbum } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`albums/${params.id}`);
	const album = await getPagedData<SimplifiedAlbum>(endpoint, locals.auth);

	return {
		album,
	};
};
