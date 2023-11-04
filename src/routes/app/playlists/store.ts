import type { Page, Playlist, TrackItem } from "$lib/typings/spotify";

import { writable } from "svelte/store";

import { getAppEndpoint } from "$lib/utils/data";
import { getInitialPage } from "$lib/utils/api";

export function getLink(item: Playlist, currentPath: string) {
	const href = `/app/playlists/${item.id}`;
	const isActive = currentPath === href;

	return { href, isActive };
}

const createPlaylistStore = () => {
	const initialPage = getInitialPage<Playlist<TrackItem>>();
	const { subscribe, set, update } = writable(initialPage);

	return {
		subscribe,
		set,
		update,
		loadNext: async (next: string | null) => {
			if (next === null) return;

			const endpoint = new URL("api/playlists", window.location.origin);
			const res = await fetch(getAppEndpoint(next, endpoint));
			const data = (await res.json()) as Page<Playlist<TrackItem>>;

			playlists.update((state) => {
				return {
					...data,
					items: [...state.items, ...data.items],
				};
			});
		},
	};
};

export const playlists = createPlaylistStore();
