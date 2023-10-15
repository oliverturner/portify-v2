import type { Album } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint } from "$lib/utils/data";
import { queryApi } from "$lib/server/api";

export { actions } from "$lib/actions";

const options = {
	market: "from_token",
	include_groups: "single,album",
	expand: "tracks",
	fields: {
		album:
			"id,name,images,release_date,genres,artists,tracks.items(track_number,duration_ms,disc_number,name,id,artists)",
	},
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`albums/${params.id}`, options);
	const album = await queryApi<Album>(endpoint, locals.auth);

	return {
		album,
	};
};
