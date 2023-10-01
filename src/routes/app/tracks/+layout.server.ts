import type { Page, Track } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

const apiParams = {
	time_range: "long_term",
};

export const load: LayoutServerLoad = async ({ locals }) => {
	// const endpoint = getEndpoint("me/top/artists", apiParams);
	const endpoint = getEndpoint("me/top/tracks", apiParams);
	const tracks = await getPagedData<Page<Track>>(endpoint, locals.auth);

	return {
		tracks,
	};
};
