import type { Page, Artist } from "$lib/typings/spotify";

export const load = async ({ fetch }) => {
	try {
		const [topArtists, followedArtists] = await Promise.all<Page<Artist>>([
			fetch("/api/artists/top?offset=0").then((res) => (res.ok ? res.json() : null)),
			fetch("/api/artists/following").then((res) => (res.ok ? res.json() : null)),
		]);

		return {
			topArtists,
			followedArtists,
		};
	} catch (error) {
		console.error(error);

		return {
			topArtists: null,
			followedArtists: null,
		};
	}
};
