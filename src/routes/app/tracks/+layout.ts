import type { Page, Track } from "$lib/typings/spotify";

export const load = async ({ fetch }) => {
	const res = await fetch("/api/tracks?offset=0");

	try {
		return {
			tracks: res.json() as Promise<Page<Track>>,
		};
	} catch (error) {
		console.error(error);

		return {
			tracks: null,
		};
	}
};
