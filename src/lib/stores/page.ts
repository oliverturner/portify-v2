import type { Page } from "$lib/typings/spotify";

import { writable } from "svelte/store";

import { getInitialPage } from "$lib/utils/api";
import { getAppEndpoint } from "$lib/utils/data";

export function createPageStore<T>(endpoint: string) {
	const initialPage = getInitialPage<T>();
	const { subscribe, set, update } = writable(initialPage);

	return {
		subscribe,
		set,
		update,
		loadNext: async (next: string | null) => {
			if (next === null) return;

			const url = new URL(endpoint, window.location.origin);
			const res = await fetch(getAppEndpoint(next, url));

			if (res.ok) {
				const json = await res.json();
				const data = json as Page<T>;

				update((state) => {
					return {
						...data,
						items: [...state.items, ...(data.items ?? [])],
					};
				});
			}
		},
	};
}
