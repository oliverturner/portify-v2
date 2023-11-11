import type { AudioTrack } from "$lib/typings/app";
import type { PageLoad } from "./$types";

// export { actions } from "$lib/actions";

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/tracks/${params.id}`);

	return res.json() as Promise<{
		track: AudioTrack;
		recommendedArtists: AudioTrack[];
		recommendedTracks: AudioTrack[];
	}>;
};
