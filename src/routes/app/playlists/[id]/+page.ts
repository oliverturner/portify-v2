import type { PageLoad } from "./$types";
import type { Page, Playlist, TrackItem } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app";

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/playlists/${params.id}`);

	return res.json() as Promise<{
		playlist: Playlist<TrackItem>;
		tracks: Page<AudioTrack>;
	}>;
};
