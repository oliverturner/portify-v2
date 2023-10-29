<script lang="ts">
	import type { Track, SimplifiedTrack } from "$lib/typings/spotify";
	import type { TrackMetadata } from "$lib/typings/app";

	import { getTrackKey } from "$lib/utils/track";
	import { keyNotation } from "$lib/stores/prefs";

	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";
	import BandcampLink from "./vendor-links/bandcamp.svelte";
	import BeatportLink from "./vendor-links/beatport.svelte";

	export let index: number;
	export let track: Track | SimplifiedTrack;
	export let showTrackArtists: boolean = true;
	export let metadata = {} as TrackMetadata;

	$: trackKey = getTrackKey($keyNotation, metadata) ?? "N/A";
	$: tempo = metadata.tempo ?? "N/A";
</script>

<article class="track">
	<aside class="track__meta">
		<span class="track__meta__index">{index}</span>
		<p class="track__meta__key" style="--bg: {trackKey.hsl}"><span>{trackKey.key}</span></p>
		<p class="track__meta__bpm">{tempo} BPM</p>
	</aside>

	<div class="track__info">
		{#if showTrackArtists}
			<div class="artists">
				<Icon id="icon-artist" />
				<ul>
					{#each track.artists as artist}
						<li><a href="/app/artists/{artist.id}">{artist.name}</a></li>
					{/each}
				</ul>
			</div>
		{/if}

		<IconLink icon="icon-track" href="/app/tracks/{track.id}">
			<span>{track.name}</span>
		</IconLink>

		<div class="links">
			<Icon id="icon-shopping-bag" />
			<BandcampLink {track} />
			<BeatportLink {track} />
		</div>
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
		grid-area: meta;

		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: auto 1fr;
		grid-template-areas:
			"index index"
			"key   bpm";
		background: var(--surface-3);

		& > * {
			padding: 0.5rem;
			text-align: center;
		}
	}

	.track__meta__index {
		grid-area: index;

		display: grid;
		place-content: center;
	}

	.track__meta__key {
		grid-area: key;

		background-color: var(--bg);

		& span {
			mix-blend-mode: difference;
		}
	}

	.track__meta__bpm {
		grid-area: bpm;
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

	.artists {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0.5rem;

		& li {
			display: inline;

			&:not(:last-child)::after {
				content: ", ";
			}
		}
	}
</style>
