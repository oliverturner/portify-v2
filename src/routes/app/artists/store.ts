import type { Artist, Page } from "$lib/typings/spotify";
import { getAppEndpoint } from "$lib/utils/data";

import { writable } from "svelte/store";

export const initialPage: Page<Artist> = {
	items: [],
	total: 0,
	offset: 0,
	limit: 0,
	href: "",
	next: null,
	previous: null,
};

const createArtists = () => {
	const { subscribe, set, update } = writable<Page<Artist>>(initialPage);

	return {
		subscribe,
		set,
		update,
		loadNext: async (next: string | null) => {
			if (next === null) return;

			const endpoint = new URL("api/artists/top", window.location.origin);
			const res = await fetch(getAppEndpoint(next, endpoint));
			const data = await res.json();

			console.log("loadNext complete", endpoint.toString());

			artists.update((state) => {
				return {
					...data,
					items: [...state.items, ...data.items],
				};
			});
		},
	};
};

export const artists = createArtists();
