<script lang="ts">
	import type { Track } from "$lib/typings/spotify";
	import type { TrackMetadata } from "$lib/typings/app";

	import BandcampLink from "$lib/components/vendor-links/bandcamp.svelte";
	import BeatportLink from "$lib/components/vendor-links/beatport.svelte";
	import { playTrack } from "$lib/utils/player";

	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";

	export let track: Track;
	export let metadata = {} as TrackMetadata;

	$: key = metadata.key ?? "N/A";
	$: tempo = metadata.tempo ?? "N/A";
</script>

<div class="track">
	<a class="track__btn" href={track.href} on:click|preventDefault={() => playTrack(track.id)}>
		<figure class="track__cover">
			<img class="square" src={track.album.images[1].url} alt={track.name} loading="lazy" />
			<figcaption>
				<span>{key} </span>
				<span>{tempo} BPM</span>
			</figcaption>
		</figure>
	</a>

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
</div>

<style lang="postcss">
	.track {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: "cover info";
		align-items: start;

		background: var(--surface-5);
	}

	.track__btn {
		--_wh: 10rem;

		grid-area: cover;

		width: var(--_wh);
		height: var(--_wh);
		background: var(--surface-5);
	}

	.track__cover {
		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			"."
			"metadata";

		width: 100%;
		height: 100%;

		& img {
			grid-area: 1 / 1 / -1 / -1;
		}

		& figcaption {
			grid-area: metadata;

			display: flex;
			background: var(--surface-1);
		}

		& span {
			flex: 1;

			padding: 0.5rem;
			text-align: center;
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
