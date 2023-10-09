import type { Page, Artist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApi } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals }) => {
	// TODO: make endpoints an array?
	// const endpoint = buildUrl(`me/following?type=artist`).toString();
	const endpoint = getEndpoint(`me/top/artists`, { limit: 50 });
	const artists = await queryApi<Page<Artist>>(endpoint, locals.auth);

	return {
		artists,
	};
};
