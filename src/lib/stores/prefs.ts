import type { KeyNotation } from "$lib/typings/app";

import { browser } from "$app/environment";
import { writable } from "svelte/store";

function updateLocalStorage(key: string, value: string) {
	if (browser) {
		localStorage.setItem(key, value);
	}
}

const getStoredNotation = () => {
	if (!browser) return undefined;

	const storedNotation = localStorage.getItem("keyNotation");
	switch (storedNotation) {
		case "camelot":
		case "musical":
			return storedNotation;

		default:
			return undefined;
	}
};

const createKeyNotation = (storedNotation: KeyNotation = "camelot") => {
	const store = writable<KeyNotation>(storedNotation);
	const { subscribe, set } = store;

	return {
		subscribe,
		set(n: KeyNotation) {
			updateLocalStorage("keyNotation", n);
			set(n);
		},
		update(cb: (n: KeyNotation) => KeyNotation) {
			return store.update((n) => {
				const newNotation = cb(n);
				updateLocalStorage("keyNotation", newNotation);
				return newNotation;
			});
		},
		toggle: () => keyNotation.update((n) => (n === "camelot" ? "musical" : "camelot")),
	};
};

export const keyNotation = createKeyNotation(getStoredNotation());
