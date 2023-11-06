import type { Page, Playlist, TrackItem } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch("/api/playlists?offset=0");

	return {
		playlists: res.json() as Promise<Page<Playlist<TrackItem>>>
	};
};
