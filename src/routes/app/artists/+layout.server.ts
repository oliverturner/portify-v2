import type { Page, Artist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
	const [artists, following] = await Promise.all<Page<Artist>>([
		fetch("/api/artists/top?offset=0").then((res) => res.json()),
		fetch("/api/artists/following?offset=0").then((res) => res.json()),
	]);

	return {
		artists,
		following,
	};
};
