import type { KeyNotation } from "$lib/typings/app";

import { writable } from "svelte/store";

export const keyNotation = writable<KeyNotation>("camelot");
