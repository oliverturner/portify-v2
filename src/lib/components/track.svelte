<script lang="ts">
	import type { Track } from "$lib/typings/spotify";
	import type { TrackMetadata } from "$lib/typings/app";

	import { playTrack } from "$lib/utils/player";
	import { getTrackKey } from "$lib/utils/track";
	import { keyNotation } from "$lib/stores/prefs";
	import BandcampLink from "./vendor-links/bandcamp.svelte";
	import BeatportLink from "./vendor-links/beatport.svelte";

	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";

	export let track: Track;
	export let metadata = {} as TrackMetadata;

	// TODO: Export this from the store
	function onTrackKeyChange() {
		keyNotation.update(() => ($keyNotation === "camelot" ? "musical" : "camelot"));
	}

	$: trackKey = getTrackKey($keyNotation, metadata) ?? "N/A";
	$: tempo = metadata.tempo ?? "N/A";
</script>

<article class="track">
	<figure class="track__cover">
		<img class="square" src={track.album.images[1].url} alt={track.name} loading="lazy" />
		<a class="track__playbtn" href={track.href} on:click|preventDefault={() => playTrack(track.id)}>
			<Icon id="icon-play" />
			<span class="sr-only">Play</span>
		</a>
		<figcaption class="track__meta">
			<p class="track__meta__key">
				<button style="--bg: {trackKey.hsl}" on:click={onTrackKeyChange}>
					<span>
						{trackKey.key}
					</span>
				</button>
			</p>
			<p class="track__meta__bpm">{tempo} <span>bpm</span></p>
		</figcaption>
	</figure>

	<div class="info">
		<div class="artists">
			<Icon id="icon-artist" />
			<ul>
				{#each track.artists as artist}
					<li><a href="/app/artists/{artist.id}">{artist.name}</a></li>
				{/each}
			</ul>
		</div>

		<IconLink icon="icon-track" href="/app/tracks/{track.id}" title="Track">
			<span>{track.name}</span>
		</IconLink>

		<IconLink icon="icon-album" href="/app/albums/{track.album.id}" title="Release">
			<span>{track.album.name}</span>
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
		grid-template-areas: "cover info";
		align-items: start;

		background: var(--surface-5);
	}

	.track__cover {
		--_wh: 10rem;

		grid-area: cover;

		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			"btn"
			"meta";

		width: var(--_wh);
		height: var(--_wh);
		background: var(--surface-5);

		& img {
			grid-area: 1 / 1 / -1 / -1;
		}
	}

	.track__playbtn {
		grid-area: btn;
	}

	.track__meta {
		grid-area: meta;

		display: flex;
		align-items: center;

		& > * {
			padding: 0.5rem;
		}
	}

	.track__meta__key {
		flex: 1;

		& > button {
			/* padding: 0.75ch; */
			border: none;
			white-space: nowrap;
			font-weight: 400;
			background-color: var(--bg);
		}

		& span {
			mix-blend-mode: difference;
		}
	}

	.track__meta__bpm {
		border-radius: 0.5rem 0 0 0.5rem;
		background: var(--surface-2);

		& > span {
			font-variant: small-caps;
		}
	}

	.info {
		grid-area: info;

		display: grid;
		align-content: center;
		gap: 0.5rem;

		padding: 1rem;
		font-size: 0.8rem;

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

	.links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
