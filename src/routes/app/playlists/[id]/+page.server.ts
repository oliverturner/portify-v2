import type { Page, PlaylistedTrack, Track } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

import { getEndpoint, isTrack } from "$lib/utils/data";
import { getPagedData } from "$lib/server/api";

export { actions } from "$lib/actions";

const PAGE_FIELDS = "total,previous,next,offset";

const apiParams = {
	limit: 50,
	market: "from_token",
	fields: `${PAGE_FIELDS},items(track(id,name,type,is_playable,duration_ms,artists(id,name),album(id,name,images)))`,
};

export const load: PageServerLoad = async ({ locals, params }) => {
	const endpoint = getEndpoint(`playlists/${params.id}/tracks`, apiParams);
	const tracks = await getPagedData<Page<PlaylistedTrack>>(endpoint, locals.auth);

	// Are all playlist items part of a group, such as a mix?
	const testTrack = tracks?.items[0]?.track as Track;
	const albumId = testTrack?.album?.id;
	const isGrouped =
		tracks?.items.every((item: PlaylistedTrack) => {
			return isTrack(item.track) && item.track.album.id === albumId;
		}) || false;

	console.log("isGrouped", { albumId, paramId: params.id, match: albumId === params.id });

	return {
		isGrouped,
		tracks,
	};
};
