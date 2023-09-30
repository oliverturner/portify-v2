import type { PageServerLoad } from "./$types";
import type { Track } from "$lib/typings/spotify";

import { getEndpoint, getPagedData } from "$lib/utils/data";

export { actions } from "$lib/actions";

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`tracks/${params.id}`);
	const pageData = await getPagedData<Track>(endpoint, locals.auth);

	return pageData;
};
