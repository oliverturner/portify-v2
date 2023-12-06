import type {
	AudioFeaturesCollection,
	SimplifiedTrack,
	Track,
	TrackItem,
} from "$lib/typings/spotify";
import type { AudioTrack, QueryApi, TrackAudioFeatures } from "$lib/typings/app";

import keyNotation from "$lib/constants/key-notation";

import { getEndpoint } from "./spotify";

export async function getAudioFeatures({
	playableTracks,
	queryApi,
}: {
	playableTracks: Track[] | SimplifiedTrack[];
	queryApi: QueryApi;
}) {
	const trackIds = playableTracks.map(({ id }) => id);
	const uniqueIds = new Set(trackIds);
	const ids = [...uniqueIds].join(",");

	const endpoint = getEndpoint("audio-features", { ids });
	const res = await queryApi<AudioFeaturesCollection>(endpoint);

	const trackAudio: Record<string, TrackAudioFeatures> = {};
	if (res?.audio_features?.[0]) {
		for (const feature of res?.audio_features ?? []) {
			const { id, mode, tempo, key } = feature ?? {};
			trackAudio[id] = { mode, tempo: Math.round(tempo), key };
		}
	}

	return trackAudio;
}

export function getTrackAudio(audioFeatures?: TrackAudioFeatures) {
	if (!audioFeatures) return;

	const { mode, key, tempo } = audioFeatures;
	const chord = mode === 0 ? "minor" : "major";
	const keyConfig = keyNotation[key] ?? {};

	return { tempo, ...keyConfig[chord] };
}

export const isTrack = (trackItem: TrackItem | AudioTrack): trackItem is Track => {
	return trackItem?.type === "track";
};

export const isPlayable = ({ is_playable, is_local }: AudioTrack) => {
	return is_playable === false || is_local === true ? false : true;
};

export async function injectAudio(queryApi: QueryApi, rawTracks: TrackItem[] | AudioTrack[]) {
	const tracks = rawTracks.filter(isTrack);
	const playableTracks = tracks.filter(isPlayable) as AudioTrack[];
	const audioFeatures = await getAudioFeatures({ playableTracks, queryApi });

	for (const track of playableTracks) {
		track.audio = getTrackAudio(audioFeatures[track.id]);
	}

	return playableTracks;
}

export function getTrackLinks(track: Track | SimplifiedTrack | null) {
	if (!track) return;

	const bandcampArtist = track.artists[0]?.name;
	const bandcampUrl = new URL("https://bandcamp.com/search");
	bandcampUrl.searchParams.set("q", `${bandcampArtist} ${track.name}`);

	const beatportArtists = track.artists.map((artist) => artist.name).join(",");
	const beatportUrl = new URL("https://www.beatport.com/search");
	beatportUrl.searchParams.set("q", `${beatportArtists} ${track.name}`);

	return {
		spotify: track.external_urls?.spotify,
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
