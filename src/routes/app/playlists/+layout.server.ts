import type { Page, Playlist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch("/api/playlists");

	return {
		playlists: res.json() as Promise<Page<Playlist>>,
	};
};
