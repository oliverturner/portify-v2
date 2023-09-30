import type { Page, PlaylistedTrack } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint, getPagedData } from "$lib/utils/data";

export { actions } from "$lib/actions";

const PAGE_FIELDS = "total,previous,next,offset";

const apiParams = {
	limit: 50,
	market: "from_token",
	fields: `${PAGE_FIELDS},items(track(id,name,is_playable,duration_ms,artists(id,name),album(id,name,images)))`,
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`playlists/${params.id}/tracks`, apiParams);
	const tracks = await getPagedData<Page<PlaylistedTrack>>(endpoint, locals.auth);

	return {
		tracks,
	};
};
