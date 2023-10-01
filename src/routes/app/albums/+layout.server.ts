import type { Page, SavedAlbum } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals }) => {
	const endpoint = getEndpoint(`me/albums`);
	const albums = await getPagedData<Page<SavedAlbum>>(endpoint, locals.auth);

	return {
		albums,
	};
};
