import type { Page, PlaylistedTrack, TrackItem } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { mergeParams } from "$lib/utils/data.js";
import { getEndpoint } from "$lib/utils/spotify.js";
import { injectAudio } from "$lib/utils/track.js";

const trackFields = [
	"id",
	"name",
	"type",
	"is_local",
	"is_playable",
	"duration_ms",
	"artists(id,name)",
	"album(id,name,images)",
	"external_urls",
].join(",");

const getDefaultParams = () => ({
	offset: 0,
	limit: 50,
	market: "from_token",
	fields: `limit,offset,total,next,previous,items(track(${trackFields}))`,
});

export async function GET({ params, locals, url }) {
	try {
		const queryApi = await queryApiFn(locals.auth);

		// TODO: throw Svelte error if queryApi is null
		if (!queryApi) return json(null);

		const endpoint = getEndpoint(
			`playlists/${params.id}/tracks`,
			mergeParams(getDefaultParams(), url),
		);
		const res = await queryApi<Page<PlaylistedTrack<TrackItem>>>(endpoint);
		const { items, ...page } = res ?? {};
		const trackItems = items?.map(({ track }) => track);
		const audioTracks = await injectAudio(queryApi, trackItems ?? []);
		const tracks = { ...page, items: audioTracks };

		return json(tracks);
	} catch (error) {
		console.log(error);
	}
}
