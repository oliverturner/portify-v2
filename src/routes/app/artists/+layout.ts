import type { Page, Artist } from "$lib/typings/spotify";

export const load = async ({ fetch }) => {
	const [topArtists, followedArtists] = await Promise.all<Page<Artist>>([
		fetch("/api/artists/top?offset=0").then((res) => res.json()),
		fetch("/api/artists/following").then((res) => res.json()),
	]);

	return {
		topArtists,
		followedArtists,
	};
};
