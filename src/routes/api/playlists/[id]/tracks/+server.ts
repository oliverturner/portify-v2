import type { Page, PlaylistedTrack, TrackItem } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { getTrackAudioFeatures } from "$lib/utils/track";
import { getEndpoint, isTrack } from "$lib/utils/data";

function filterTracks(items: PlaylistedTrack<TrackItem>[]) {
	return (items ?? []).map((item) => item.track).filter(isTrack);
}

const trackFields = [
	"id",
	"name",
	"type",
	"is_local",
	"is_playable",
	"duration_ms",
	"artists(id,name)",
	"album(id,name,images)",
].join(",");

const apiParams = {
	market: "from_token",
	fields: `limit,offset,total,items(track(${trackFields}))`,
};

export async function GET({ locals, params, url }) {
	try {
		const queryApi = await queryApiFn(locals.auth);

		// TODO: throw Svelte error if queryApi is null
		if (!queryApi) return json({ playlist: null });

		const offset = Number(url.searchParams.get("offset")) ?? 0;
		const endpoint = getEndpoint(`playlists/${params.id}/tracks`, { ...apiParams, offset });
		const { items, ...page } = await queryApi<Page<PlaylistedTrack<TrackItem>>>(endpoint);

		const tracks = filterTracks(items);
		const tracksMetadata = await getTrackAudioFeatures({ tracks, queryApi });

		return json({
			page,
			tracks,
			tracksMetadata,
		});
	} catch (error) {
		console.log(error);
	}
}
