import type { Page, Track } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

// TODO: load from API instead
export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await fetch("/api/tracks");

	return {
		tracks: res.json() as Promise<Page<Track>>,
	};
};
