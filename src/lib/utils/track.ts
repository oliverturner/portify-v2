import type { AudioFeaturesCollection, SimplifiedTrack, Track } from "$lib/typings/spotify";
import type { KeyNotation, QueryApi, TrackMetadata } from "$lib/typings/app";

import { getEndpoint } from "./data";
import notationData from "$lib/constants/key-notation.json";

export async function getTrackMetadata({
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

export function getTrackKey(notation: KeyNotation, { mode, key }: TrackMetadata) {
	const chord = mode === 0 ? "minor" : "major";
	const keyLabel = notationData[notation][chord][key];
	const hue = parseInt(keyLabel, 10) - 1;

	const h = (hue * 30) % 360;
	const l = mode === 0 ? 70 : 85;

	const okl = mode === 0 ? 76 : 69;
	const okc = mode === 0 ? 0.12 : 0.19;
	const okh = (hue * 30) % 360;

	return {
		key: keyLabel,
		hsl: `hsl(${h}deg 60% ${l}%)`,
		oklch: `oklch(${okl}% ${okc} ${okh})`,
	};
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
