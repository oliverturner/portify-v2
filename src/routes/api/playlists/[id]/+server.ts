import type { Page, Playlist } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { getSpotifyEndpoint, mergeParams } from "$lib/utils/data";

const apiParams = {
	fields: `id,name,description,images`,
	market: "from_token",
	limit: 50,
	offset: 0,
};

export async function GET({ locals, params, fetch, url }) {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getSpotifyEndpoint(`playlists/${params.id}`, mergeParams(apiParams, url));
	const playlist = await queryApi<Playlist>(endpoint);

	const res = await fetch(`/api/playlists/${params.id}/tracks`);
	const tracks = (await res.json()) as Page<AudioTrack>;

	return json({
		playlist,
		tracks,
	});
}
