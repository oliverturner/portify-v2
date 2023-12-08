import type { Album, Artist, Page } from "$lib/typings/spotify.js";
import type { AudioTrack } from "$lib/typings/app.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/artists/${params.id}`);

	try {
		const json = await res.json();

		return json as {
			artist: Artist;
			tracks: AudioTrack[];
			albums: Page<Album>;
			appearsOn: Page<Album>;
			related: { artists: Artist[] };
		};
	} catch (error) {
		console.error(error);

		return {
			artist: null,
			tracks: null,
			albums: null,
			appearsOn: null,
			related: null,
		};
	}
};
