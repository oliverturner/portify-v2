import type { Album, Artist, Page } from "$lib/typings/spotify.js";
import type { AudioTrack } from "$lib/typings/app.js";
import type { PageLoad } from "./$types";

// export { actions } from "$lib/actions";

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/artists/${params.id}`);
	const json = await res.json();

	return json as {
		artist: Artist;
		tracks: AudioTrack[];
		albums: Page<Album>;
		appearsOn: Page<Album>;
		related: { artists: Artist[] };
	};
};
