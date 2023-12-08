import type { Page } from "$lib/typings/spotify";
import type { AudioTrack } from "$lib/typings/app";

import { derived, writable } from "svelte/store";

import { getInitialPage } from "$lib/utils/api";

export function createPageStore() {
	const initialPage = getInitialPage<AudioTrack>();
	const { subscribe, set, update } = writable(initialPage);

	return {
		subscribe,
		set,
		update,
		loadTracks: async (id?: string, offset: number = 0) => {
			const url = new URL(`api/playlists/${id}/tracks`, window.location.origin);
			url.searchParams.set("offset", offset.toString());

			const res = await fetch(url);

			if (res.ok) {
				const data = (await res.json()) as Page<AudioTrack>;
				set(data);
			}
		},
	};
}

export const tracksPage = createPageStore();

export const isGrouped = derived(tracksPage, ($tracksPage) => {
	const sampleAlbumId = $tracksPage.items[0]?.album.id;
	return $tracksPage.items.every((track) => track.album.id === sampleAlbumId);
});
