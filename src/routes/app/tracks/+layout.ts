import type { Page, Track } from "$lib/typings/spotify";

export const load = async ({ fetch }) => {
	const res = await fetch("/api/tracks?offset=0");
	const tracks: Page<Track> = await res.json();

	return {
		tracks,
	};
};
