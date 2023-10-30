<script lang="ts">
	import type { Track } from "$lib/typings/spotify";
	import type { TrackMetadata } from "$lib/typings/app";

	import Image from "./image.svelte";
	import IconLink from "./icon-link.svelte";
	import TrackCover from "./track-cover.svelte";
	import TrackArtists from "./track-artists.svelte";
	import VendorLinks from "./vendor-links.svelte";
	import { getTrackLinks } from "$lib/utils/track";

	export let track: Track;
	export let metadata = {} as TrackMetadata;

	$: links = getTrackLinks(track);
</script>

<article class="track">
	<div class="track__cover">
		<TrackCover {track} {metadata}>
			<Image src={track.album.images[1].url} alt={track.name} />
		</TrackCover>
	</div>

	<div class="info">
		<TrackArtists artists={track.artists} />

		<IconLink icon="icon-track" href="/app/tracks/{track.id}" title="Track">
			<span>{track.name}</span>
		</IconLink>

		<IconLink icon="icon-album" href="/app/albums/{track.album.id}" title="Release">
			<span>{track.album.name}</span>
		</IconLink>

		<VendorLinks {links} />
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
		--wh: 10rem;

		grid-area: cover;
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
</style>
