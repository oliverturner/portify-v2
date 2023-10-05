import type { PageServerLoad } from "./$types";
import type { Track } from "$lib/typings/spotify";

import { getEndpoint } from "$lib/utils/data";
import { queryApi } from "$lib/server/api";
export { actions } from "$lib/actions";

const apiParams = {
	limit: 50,
	market: "from_token",
	// fields: `${PAGE_FIELDS},items(track(${trackFields.join(",")}))`,
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`tracks/${params.id}`, apiParams);
	const pageData = await queryApi<Track>(endpoint, locals.auth);

	console.log({ pageData });

	return pageData;
};
