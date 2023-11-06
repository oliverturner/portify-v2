import type { Page, SavedAlbum } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch("/api/albums?offset=0");

	return {
		albums: res.json() as Promise<Page<SavedAlbum>>,
	};
};
