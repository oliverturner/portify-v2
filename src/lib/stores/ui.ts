import { writable } from "svelte/store";

function createToggleStore() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		set,
		toggle: () => update((n) => !n),
	};
}

export const prefsPanel = createToggleStore();
export const pageNav = createToggleStore();
