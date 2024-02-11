import type { Page, Playlist } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api.js";
import { mergeParams } from "$lib/utils/data.js";
import { getEndpoint } from "$lib/utils/spotify.js";
import { DEFAULT_PARAMS } from "$lib/constants.js";

const getDefaultParams = () => ({
	...DEFAULT_PARAMS,
	fields: `id,name,description,images`,
	market: "from_token",
});

export async function GET({ locals, params, fetch, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const qs = mergeParams(getDefaultParams(), url);
	const endpoint = getEndpoint(`playlists/${params.id}`, qs);
	const playlist = await queryApi<Playlist>(endpoint);

	const res = await fetch(`/api/playlists/${params.id}/tracks?offset=0`);
	const tracks = (await res.json()) as Page<AudioTrack>;

	return json({
		playlist,
		tracks,
	});
}
