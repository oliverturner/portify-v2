import type { Page, Artist } from "$lib/typings/spotify";
import type { LayoutServerLoad } from "../$types";

import { queryApiFn } from "$lib/server/api";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const queryApi = await queryApiFn(locals.auth);

	if (!queryApi) return { artists: null, following: null };

	const [artists, following] = await Promise.all<Page<Artist>>([
		fetch("/api/artists/top?offset=0").then((res) => res.json()),
		fetch("/api/artists/following?offset=0").then((res) => res.json()),
	]);

	return {
		artists,
		following,
	};
};
