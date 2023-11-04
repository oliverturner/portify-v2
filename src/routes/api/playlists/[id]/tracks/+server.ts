import type { Page, PlaylistedTrack, TrackItem } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { queryApiFn } from "$lib/server/api";
import { getSpotifyEndpoint } from "$lib/utils/data";
import { getTrackAudioFeatures, isTrack } from "$lib/utils/track";

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
	offset: 0,
	limit: 50,
	market: "from_token",
	fields: `limit,offset,total,items(track(${trackFields}))`,
};

export async function GET({ locals, params, url }) {
	try {
		const queryApi = await queryApiFn(locals.auth);

		// TODO: throw Svelte error if queryApi is null
		if (!queryApi) return json({ playlist: null });

		const offset = url.searchParams.get("offset") ?? apiParams.offset;
		const limit = url.searchParams.get("limit") ?? apiParams.limit;
		const endpoint = getSpotifyEndpoint(`playlists/${params.id}/tracks`, {
			...apiParams,
			offset,
			limit,
		});
		const { items, ...tracksPage } = await queryApi<Page<PlaylistedTrack<TrackItem>>>(endpoint);

		const tracks = filterTracks(items);
		const tracksMetadata = await getTrackAudioFeatures({ tracks, queryApi });

		return json({
			tracks,
			tracksPage,
			tracksMetadata,
		});
	} catch (error) {
		console.log(error);
	}
}
