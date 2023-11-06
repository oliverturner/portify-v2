import type { Page, Track } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch("/api/tracks?offset=0");

	return {
		tracks: res.json() as Promise<Page<Track>>,
	};
};
