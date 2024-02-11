import type { Page, SavedAlbum } from "$lib/typings/spotify";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch("/api/albums?offset=0");
	const albums: Page<SavedAlbum> = await res.json();

	return {
		albums,
	};
};
