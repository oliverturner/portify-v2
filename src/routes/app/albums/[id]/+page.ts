import type { Album } from "$lib/typings/spotify";
import type { PageLoad } from "./$types";

// export { actions } from "$lib/actions";

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/albums/${params.id}`);
	const album: Album = await res.json();

	return {
		album,
	};
};
