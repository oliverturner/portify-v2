<script lang="ts">
	import type { AudioTrack } from "$lib/typings/app";

	import Image from "./image.svelte";
	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";
	import TrackCover from "./track-cover.svelte";
	import TrackArtists from "./track-artists.svelte";
	import VendorLinks from "./vendor-links.svelte";
	import { addToast } from "$lib/components/toaster.svelte";

	import { getTrackLinks } from "$lib/utils/track";
	import { playTrack } from "$lib/utils/player";

	export let track: AudioTrack;

	async function onPlayBtnClick() {
		const { status } = await playTrack(track.id);

		if (status === 404) {
			addToast({
				data: {
					title: "Heads up!",
					description: "To listen, Spotify Connect needs the Spotify app to be playing",
					color: "bg-red-500",
				},
			});
		}
	}

	$: links = getTrackLinks(track);
</script>

<article class="track">
	<div class="track__cover">
		<TrackCover {track}>
			<Image src={track.album?.images[1]?.url} alt={track.name} />
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

	<button class="playbtn" on:click={onPlayBtnClick}>
		<Icon id="icon-play-btn" />
		<span class="sr-only">Play</span>
	</button>
</article>

<style lang="postcss">
	.track {
		display: grid;
		grid-template-columns: auto 1fr auto;
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

	.playbtn {
		--_highlight-dark: #fff4;

		grid-area: 1 / 1 / -1 / -1;
		place-self: end;

		margin: 0.5rem;
		padding: 0.25rem;
		border-radius: 50%;

		&:hover {
			& svg {
				fill: #fff;
			}
		}
	}
</style>
