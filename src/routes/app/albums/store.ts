import type { Page, SavedAlbum } from "$lib/typings/spotify";

import { writable } from "svelte/store";

import { getAppEndpoint } from "$lib/utils/data";
import { getInitialPage } from "$lib/utils/api";

export function getLink(item: SavedAlbum, currentPath: string) {
	const href = `/app/albums/${item.album.id}`;
	const isActive = currentPath === href;

	return { href, isActive };
}

const createAlbumStore = () => {
	const initialPage = getInitialPage<SavedAlbum>();
	const { subscribe, set, update } = writable(initialPage);

	return {
		subscribe,
		set,
		update,
		loadNext: async (next: string | null) => {
			if (next === null) return;

			const endpoint = new URL("api/albums", window.location.origin);
			const res = await fetch(getAppEndpoint(next, endpoint));
			const data = (await res.json()) as Page<SavedAlbum>;

			albums.update((state) => {
				return {
					...data,
					items: [...state.items, ...data.items],
				};
			});
		},
	};
};

export const albums = createAlbumStore();
