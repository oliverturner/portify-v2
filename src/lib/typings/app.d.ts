import type { AudioFeature } from "$lib/typings/spotify";

export type QueryApi = <T>(endpoint: string, options?: RequestInit) => Promise<T>;

export type TrackMetadata = Pick<AudioFeature, "mode" | "tempo" | "key">;
