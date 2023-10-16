import type { Page, Playlist, PlaylistedTrack, Track, TrackItem } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint, isTrack } from "$lib/utils/data";
import { queryApiFn } from "$lib/server/api";
import { PAGE_FIELDS } from "$lib/constants";

export { actions } from "$lib/actions";

const trackFields = [
	"id",
	"name",
	"type",
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
function tracksAreGrouped(tracks?: Page<PlaylistedTrack<TrackItem>>) {
	if (!tracks || !tracks.items.length) return false;

	const testTrack = tracks.items[0].track as Track;
	const albumId = testTrack.album?.id;
	return tracks.items.every((item: PlaylistedTrack) => {
		return isTrack(item.track) && item.track.album.id === albumId;
	});
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { playlist: null };

	const endpoint = getEndpoint(`playlists/${params.id}`, apiParams);
	const playlist = await queryApi<Playlist>(endpoint);
	const isGrouped = tracksAreGrouped(playlist?.tracks);

	return {
		isGrouped,
		playlist,
	};
};
