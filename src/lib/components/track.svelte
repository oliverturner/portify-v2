<script lang="ts">
	import type { AudioTrack } from "$lib/typings/app";

	import Image from "./image.svelte";

	import IconLink from "./icon-link.svelte";
	import TrackCover from "./track-cover.svelte";
	import TrackArtists from "./track-artists.svelte";
	import VendorLinks from "./vendor-links.svelte";
	import PlayBtn from "./btn-play.svelte";

	import { getTrackLinks } from "$lib/utils/track";

	export let track: AudioTrack;

	$: links = getTrackLinks(track);
</script>

<article class="track">
	<div class="track__cover">
		<TrackCover {track}>
			<Image src={track.album?.images[1]?.url} alt={track.name} />
		</TrackCover>
	</div>

	<div class="info">
		<IconLink icon="icon-track" href="/app/tracks/{track.id}" title="Track">
			<span>{track.name}</span>
		</IconLink>

		<IconLink icon="icon-album" href="/app/albums/{track.album.id}" title="Release">
			<span>{track.album.name}</span>
		</IconLink>

		<TrackArtists artists={track.artists} />

		<VendorLinks {links} />
	</div>

	<div class="player">
		<PlayBtn trackId={track.id} />
	</div>
</article>

<style lang="postcss">
	.track {
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-areas: "cover info";
		align-items: center;

		height: 100%;
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

	.player {
		--_highlight-dark: #fff4;

		grid-area: 1 / 1 / -1 / -1;
		place-self: end;
		margin: 0.5rem;
	}
</style>
