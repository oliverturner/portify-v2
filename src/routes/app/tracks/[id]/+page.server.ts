import type { PageServerLoad } from "./$types";
import type { Track } from "$lib/typings/spotify";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`tracks/${params.id}`);
	const pageData = await getPagedData<Track>(endpoint, locals.auth);

	return pageData;
};
