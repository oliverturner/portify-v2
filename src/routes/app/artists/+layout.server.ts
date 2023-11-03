import type { Page, Artist, FollowedArtists } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { queryApiFn } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { artists: null, following: null };

	const [artists, following] = await Promise.all([
		fetch("/api/artists/top").then((res) => res.json()) as Promise<Page<Artist>>,
		fetch("/api/artists/following").then((res) => res.json()) as Promise<FollowedArtists>,
	]);

	return {
		artists,
		following,
	};
};
