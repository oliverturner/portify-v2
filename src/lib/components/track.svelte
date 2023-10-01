<script lang="ts">
	import type { Track } from "$lib/typings/spotify";

	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";

	export let track: Track;
</script>

<div class="grid">
	<img class="cover square" src={track.album.images[1].url} alt={track.name} />
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
	a, span {
		color: rgba(var(--color-primary-400));

		&:hover {
			text-decoration: underline;
		}
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-areas: "cover info";
		gap: 1rem;
	}

	.cover {
		grid-area: cover;
	}

	.info {
		grid-area: info;

		display: grid;
		align-content: center;
		gap: 0.5rem;
	}

	.artists {
		display: grid;
		grid-template-columns: 1.5rem 1fr;
		align-items: center;
		gap: 0.5rem;

		li {
			display: inline;
		}

		li:not(:last-child)::after {
			content: ", ";
		}
	}
</style>
