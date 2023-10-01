import type { Page, Artist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals }) => {
	// TODO: make endpoints an array?
	// const endpoint = buildUrl(`me/following?type=artist`).toString();
	const endpoint = getEndpoint(`me/top/artists`);
	const artists = await getPagedData<Page<Artist>>(endpoint, locals.auth);

	return {
		artists,
	};
};
