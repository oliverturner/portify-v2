import type { Page, SavedAlbum } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "./$types";

import { getEndpoint, getPagedData } from "$lib/utils/data";

export const load: LayoutServerLoad = async ({ locals }) => {
	const endpoint = getEndpoint(`me/albums`);
	const albums = await getPagedData<Page<SavedAlbum>>(endpoint, locals.auth);

	return {
		albums,
	};
};
