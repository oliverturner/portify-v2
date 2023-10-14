<script lang="ts">
	import type { Track } from "$lib/typings/spotify";

	import { onLoad } from "$lib/utils/image";

	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";

	export let track: Track;
</script>

<div class="track">
	<img class="cover square" src={track.album.images[1].url} alt={track.name} on:load={onLoad} />

	<div class="info">
		<div class="artists">
			<Icon id="artist" />
			<ul>
				{#each track.artists as artist}
					<li><a href="/app/artists/{artist.id}">{artist.name}</a></li>
				{/each}
			</ul>
		</div>

		<IconLink icon="track" href="/app/tracks/{track.id}">
			<span>{track.name}</span>
		</IconLink>

		<IconLink icon="album" href="/app/albums/{track.album.id}">
			<span>{track.album.name}</span>
		</IconLink>
	</div>
</div>

<style lang="postcss">
	.track {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-areas: "cover info";
		align-items: start;
	}

	.cover {
		grid-area: cover;

		display: grid;
		place-content: center;

		aspect-ratio: 1;
		max-width: 10rem;
		background: var(--surface-2);
	}

	.info {
		grid-area: info;

		display: grid;
		align-content: center;
		gap: 0.5rem;

		padding: 1rem;
		font-size: 0.9rem;

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
