import type { Album } from "$lib/typings/spotify";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/albums/${params.id}`);

	return {
		album: res.json() as Promise<Album>,
	};
};
