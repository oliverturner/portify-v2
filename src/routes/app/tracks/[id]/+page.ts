import type { AudioTrack } from "$lib/typings/app";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/tracks/${params.id}`);

	try {
		return res.json() as Promise<{
			track: AudioTrack;
			recommendedArtists: AudioTrack[];
			recommendedTracks: AudioTrack[];
		}>;
	} catch (e) {
		return {
			track: null,
			recommendedArtists: [],
			recommendedTracks: [],
		};
	}
};
