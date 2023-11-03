import type { Page, Playlist, TrackItem } from "$lib/typings/spotify";
import { getAppEndpoint } from "$lib/utils/data";

import { writable } from "svelte/store";

const initialPage: Page<Playlist<TrackItem>> = {
	items: [],
	total: 0,
	offset: 0,
	limit: 0,
	href: "",
	next: null,
	previous: null,
};

const createPlaylists = () => {
	const { subscribe, set, update } = writable<Page<Playlist<TrackItem>>>(initialPage);

	return {
		subscribe,
		set,
		update,
		loadNext: async (next: string | null) => {
			if (next === null) return;

			const endpoint = new URL("/api/playlists", window.location.origin);
			const res = await fetch(getAppEndpoint(next, endpoint));
			const data = await res.json();

			playlists.update((state) => {
				return {
					...data,
					items: [...state.items, ...data.items],
				};
			});
		},
	};
};

export const playlists = createPlaylists();
