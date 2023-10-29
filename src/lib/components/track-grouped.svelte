<script lang="ts">
	import type { Track, SimplifiedTrack } from "$lib/typings/spotify";
	import type { TrackMetadata } from "$lib/typings/app";

	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";
	import BandcampLink from "./vendor-links/bandcamp.svelte";
	import BeatportLink from "./vendor-links/beatport.svelte";
	import TrackCover from "./track-cover.svelte";
	import TrackArtists from "./track-artists.svelte";
	import TrackLinks from "./track-links.svelte";

	export let index: number;
	export let track: Track | SimplifiedTrack;
	export let metadata = {} as TrackMetadata;
	export let showTrackArtists: boolean = true;
</script>

<article class="track">
	<div class="track__meta">
		<TrackCover {track} {metadata} compact={true}>
			{index}
		</TrackCover>
	</div>

	<div class="track__info">
		{#if showTrackArtists}
			<TrackArtists artists={track.artists} />
		{/if}

		<IconLink icon="icon-track" href="/app/tracks/{track.id}">
			<span>{track.name}</span>
		</IconLink>

		<TrackLinks {track} />
	</div>
</article>

<style lang="postcss">
	.track {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: "meta info";
		gap: 1rem;

		height: 100%;
		background: var(--surface-5);
	}

	.track__meta {
		--wh: 8rem;

		grid-area: meta;
	}

	.track__info {
		grid-area: info;

		display: grid;
		gap: 0.5rem;

		padding: 1rem;
		padding-inline-start: 0;

		& a:hover {
			text-decoration: underline;
		}
	}
</style>
