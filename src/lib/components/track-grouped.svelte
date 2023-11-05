<script lang="ts">
	import type { AudioTrack } from "$lib/typings/app";

	import IconLink from "./icon-link.svelte";
	import TrackCover from "./track-cover.svelte";
	import TrackArtists from "./track-artists.svelte";
	import VendorLinks from "./vendor-links.svelte";
	import { getTrackLinks } from "$lib/utils/track";

	export let index: number;
	export let track: AudioTrack;
	export let showArtists: boolean = true;

	$: links = getTrackLinks(track);
</script>

<article class="track">
	<div class="track__meta">
		<TrackCover {track} compact={true}>
			{index}
		</TrackCover>
	</div>

	<div class="track__info">
		{#if showArtists}
			<TrackArtists artists={track.artists} />
		{/if}

		<IconLink icon="icon-track" href="/app/tracks/{track.id}">
			<span>{track.name}</span>
		</IconLink>

		<VendorLinks {links} />
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
		align-content: end;
		gap: 0.5rem;

		padding: 1rem;
		padding-inline-start: 0;

		& a:hover {
			text-decoration: underline;
		}
	}
</style>
