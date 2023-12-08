import type { Page, Playlist, TrackItem } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app";
import type { PageLoad } from "./$types";

// export { actions } from "$lib/actions";

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/playlists/${params.id}`);

	try {
		return res.json() as Promise<{
			playlist: Playlist<TrackItem>;
			tracks: Page<AudioTrack>;
		}>;
	} catch (error) {
		console.error(error);

		return {
			playlist: null,
			tracks: null,
		};
	}
};
