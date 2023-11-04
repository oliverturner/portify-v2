import type {
	AudioFeaturesCollection,
	SimplifiedTrack,
	Track,
	TrackItem,
} from "$lib/typings/spotify";
import type { QueryApi, TrackAudioFeatures } from "$lib/typings/app";

import { getSpotifyEndpoint } from "./data";
import keyNotation from "$lib/constants/key-notation";

export async function getTrackAudioFeatures({
	tracks,
	queryApi,
}: {
	tracks: Track[] | SimplifiedTrack[];
	queryApi: QueryApi;
}) {
	const playableIds = tracks
		.filter(({ is_playable, is_local }) => {
			return is_playable === false || is_local === true ? false : true;
		})
		.map(({ id }) => id);
	const uniqueIds = new Set(playableIds);
	const ids = [...uniqueIds].join(",");

	const endpoint = getSpotifyEndpoint("audio-features", { ids });
	const { audio_features } = await queryApi<AudioFeaturesCollection>(endpoint);

	const metadata: Record<string, TrackAudioFeatures> = {};
	if (audio_features?.[0]) {
		for (const feature of audio_features) {
			const { id, mode, tempo, key } = feature ?? {};
			metadata[id] = { mode, tempo: Math.round(tempo), key };
		}
	}

	return metadata;
}

export function getTrackAudio(audioFeatures?: TrackAudioFeatures) {
	if (!audioFeatures) return;

	const { mode, key } = audioFeatures;
	const chord = mode === 0 ? "minor" : "major";
	const keyConfig = keyNotation[key] ?? {};

	return keyConfig[chord];
}

export function getTrackLinks(track: Track | SimplifiedTrack | undefined) {
	if (!track) return;

	const bandcampArtist = track.artists[0].name;
	const bandcampUrl = new URL("https://bandcamp.com/search");
	bandcampUrl.searchParams.set("q", `${bandcampArtist} ${track.name}`);

	const beatportArtists = track.artists.map((artist) => artist.name).join(",");
	const beatportUrl = new URL("https://www.beatport.com/search");
	beatportUrl.searchParams.set("q", `${beatportArtists} ${track.name}`);

	return {
		bandcamp: bandcampUrl.toString(),
		beatport: beatportUrl.toString(),
	};
}

/**
 * Are all playlist items part of a group, such as a mix?
 */
export function tracksAreGrouped(tracks: Track[]) {
	const testTrack = tracks[0];
	const albumId = testTrack.album?.id;

	return tracks.every((track) => track.album.id === albumId);
}

export const isTrack = (trackItem: TrackItem): trackItem is Track => {
	return trackItem?.type === "track";
};
