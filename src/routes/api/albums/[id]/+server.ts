import type { Album } from "$lib/typings/spotify.js";
import type { AudioTrack } from "$lib/typings/app.js";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { mergeParams } from "$lib/utils/data.js";
import { getEndpoint } from "$lib/utils/spotify.js";
import { injectAudio } from "$lib/utils/track.js";

const apiParams = {
	market: "from_token",
	include_groups: "single,album",
	expand: "tracks",
	fields: {
		album:
			"id,name,images,release_date,genres,artists,tracks.items(track_number,duration_ms,disc_number,name,id,artists)",
	},
};

// TODO: add `albums/${params.id}/tracks` endpoint
export const GET = async ({ locals, params, url }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return json(null);

	const endpoint = getEndpoint(`albums/${params.id}`, mergeParams(apiParams, url));
	const album = await queryApi<Album>(endpoint);

	const trackItems = (album?.tracks?.items ?? []) as AudioTrack[];
	const audioTracks = await injectAudio(queryApi, trackItems);
	album.tracks.items = audioTracks;

	return json(album);
};
