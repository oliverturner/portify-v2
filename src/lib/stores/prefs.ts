import type { KeyNotation } from "$lib/typings/app";

import { writable } from "svelte/store";

const createKeyNotation = () => {
	const { subscribe, set, update } = writable<KeyNotation>("camelot");

	return {
		subscribe,
		set,
		update,
		toggle: () => update((n) => (n === "camelot" ? "musical" : "camelot")),
	};
};

export const keyNotation = createKeyNotation();
