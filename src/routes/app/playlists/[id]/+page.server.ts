import type { PageServerLoad } from "./$types";
import type { Playlist } from "$lib/typings/spotify";

import { queryApiFn } from "$lib/server/api";
import { getEndpoint } from "$lib/utils/data";

const apiParams = {
	fields: `name,description,images`,
};

export const load: PageServerLoad = async ({ locals, params, fetch }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { playlist: null };

	const endpoint = getEndpoint(`playlists/${params.id}`, apiParams);
	const playlist = await queryApi<Playlist>(endpoint);

	const res = await fetch(`/api/playlists/${params.id}/tracks`);
	const tracks = await res.json();

	return {
		playlist,
		...tracks,
	};
};
