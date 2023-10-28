import type { AudioFeaturesCollection, Track } from "$lib/typings/spotify";
import type { QueryApi, TrackMetadata } from "$lib/typings/app";

import { getEndpoint } from "./data";

export async function getTrackMetadata({
	tracks,
	queryApi,
}: {
	tracks: Track[];
	queryApi: QueryApi;
}) {
	const ids = tracks
		.filter(({ is_playable, is_local }) => {
			return is_playable === false || is_local === true ? false : true;
		})
		.map(({ id }) => id)
		.join(",");

	const endpoint = getEndpoint("audio-features", { ids });
	const { audio_features } = await queryApi<AudioFeaturesCollection>(endpoint);

	const metadata: Record<string, TrackMetadata> = {};
	if (audio_features?.[0]) {
		for (const { id, mode, tempo, key } of audio_features) {
			metadata[id] = { mode, tempo: Math.round(tempo), key };
		}
	}

	return metadata;
}
