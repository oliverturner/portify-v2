import type { AudioFeatures, SimplifiedTrack, Track } from "$lib/typings/spotify";

export type QueryApi = <T>(endpoint: string, options?: RequestInit) => Promise<T>;

export type TrackAudioFeatures = Pick<AudioFeatures, "mode" | "tempo" | "key">;

// TODO: Add "openkey" notation
export type KeyNotation = "camelot" | "musical";

export interface ChordConfig {
	oklch: string;
	keys: Record<KeyNotation, string>;
}

export interface KeyConfig {
	minor: ChordConfig;
	major: ChordConfig;
}

export type AudioTrack = (Track | SimplifiedTrack) & {
	audio?: ChordConfig & { tempo: number };
};
