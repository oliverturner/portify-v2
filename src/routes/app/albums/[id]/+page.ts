import type { Album } from "$lib/typings/spotify";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/albums/${params.id}`);

	try {
		return {
			album: res.json() as Promise<Album>,
		};
	} catch (error) {
		console.error(error);

		return { album: null };
	}
};
