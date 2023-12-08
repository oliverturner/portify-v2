import type { Page, SavedAlbum } from "$lib/typings/spotify";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch("/api/albums?offset=0");

	try {
		return {
			albums: res.json() as Promise<Page<SavedAlbum>>,
		};
	} catch (error) {
		console.error(error);

		return {
			albums: null,
		};
	}
};
