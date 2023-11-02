import type { Playlist, PlaylistedTrack, TrackItem } from "$lib/typings/spotify";

import { json } from "@sveltejs/kit";

import { PAGE_FIELDS } from "$lib/constants";
import { queryApiFn } from "$lib/server/api";
import { getTrackAudioFeatures } from "$lib/utils/track";
import { getEndpoint, isTrack } from "$lib/utils/data";

function filterPlaylistTracks(items: PlaylistedTrack<TrackItem>[]) {
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
	fields: `name,description,images,tracks(${PAGE_FIELDS},items(track(${trackFields})))`,
};

export async function GET({ locals, params, url }) {
	try {
		const queryApi = await queryApiFn(locals.auth);

		// TODO: throw Svelte error if queryApi is null
		if (!queryApi) return json({ playlist: null });

		const offset = Number(url.searchParams.get("offset")) ?? 0;

		const endpoint = getEndpoint(`playlists/${params.id}`, { ...apiParams, offset });
		const playlist = await queryApi<Playlist>(endpoint);

		const { name, images, description, tracks } = playlist;
		const { items, ...playlistMeta } = tracks;
		const filteredTracks = filterPlaylistTracks(items);
		const tracksMetadata = await getTrackAudioFeatures({ tracks: filteredTracks, queryApi });

		console.log({
			playlistMeta,
			trackNum: filteredTracks.length,
		});

		return json({
			playlist: { name, images, description },
			playlistMeta,
			tracks: filteredTracks,
			tracksMetadata,
		});
	} catch (error) {
		console.log(error);
	}
}
