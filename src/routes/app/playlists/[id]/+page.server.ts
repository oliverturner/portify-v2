import type { Playlist, Track, TrackItem } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint, isTrack } from "$lib/utils/data";
import { getTrackMetadata } from "$lib/utils/track";
import { queryApiFn } from "$lib/server/api";
import { PAGE_FIELDS } from "$lib/constants";

export { actions } from "$lib/actions";

function getPlaylistTracks(playlist: Playlist<TrackItem>) {
	return (playlist?.tracks?.items ?? []).map((item) => item.track).filter(isTrack);
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
	limit: 50,
	market: "from_token",
	fields: `name,description,images,tracks(${PAGE_FIELDS},items(track(${trackFields})))`,
};

/**
 * Are all playlist items part of a group, such as a mix?
 */
function tracksAreGrouped(tracks: Track[]) {
	const testTrack = tracks[0];
	const albumId = testTrack.album?.id;

	return tracks.every((track) => track.album.id === albumId);
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { playlist: null };

	const endpoint = getEndpoint(`playlists/${params.id}`, apiParams);
	const playlist = await queryApi<Playlist>(endpoint);
	const tracks = getPlaylistTracks(playlist);

	const metadata = await getTrackMetadata({ tracks, queryApi });
	const isGrouped = tracksAreGrouped(tracks);

	return {
		isGrouped,
		playlist,
		metadata,
	};
};
