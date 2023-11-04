import type { Artist, Page } from "$lib/typings/spotify";

import { writable } from "svelte/store";

import { getInitialPage } from "$lib/utils/api";
import { getAppEndpoint } from "$lib/utils/data";

export function getLink(item: Artist, currentPath: string) {
	const href = `/app/artists/${item.id}`;
	const isActive = currentPath.startsWith(href);

	return { href, isActive };
}

const createArtists = () => {
	const initialPage = getInitialPage<Artist>();
	const { subscribe, set, update } = writable(initialPage);

	return {
		subscribe,
		set,
		update,
		loadNext: async (next: string | null) => {
			if (next === null) return;

			const endpoint = new URL("api/artists/following", window.location.origin);
			const res = await fetch(getAppEndpoint(next, endpoint));
			const data = (await res.json()) as Page<Artist>;

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
