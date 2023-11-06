import type { Page, Playlist, TrackItem } from "$lib/typings/spotify";

export const load = async ({ fetch }) => {
	const res = await fetch("/api/playlists?offset=0");

	return {
		playlists: res.json() as Promise<Page<Playlist<TrackItem>>>
	};
};
