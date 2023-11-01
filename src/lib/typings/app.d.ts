import type { AudioFeatures } from "$lib/typings/spotify";

export type QueryApi = <T>(endpoint: string, options?: RequestInit) => Promise<T>;

export type TrackMetadata = Pick<AudioFeatures, "mode" | "tempo" | "key">;

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
