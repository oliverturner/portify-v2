import type { Page, Playlist, TrackItem } from "$lib/typings/spotify";

export const load = async ({ fetch }) => {
	const res = await fetch("/api/playlists?offset=0");
	const playlists: Page<Playlist<TrackItem>> = await res.json();

	return {
		playlists,
	};
};
