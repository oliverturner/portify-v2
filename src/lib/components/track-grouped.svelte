<script lang="ts">
	import type { Track } from "$lib/typings/spotify";

	import Icon from "./icon.svelte";
	import IconLink from "./icon-link.svelte";

	export let track: Track;
	export let index: number;
</script>

<div class="track">
	<span class="track__index">{index + 1}</span>
	<div class="track__info">
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
	</div>
</div>

<style lang="postcss">
	.track {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas: "index info";
		gap: 1rem;

		height: 100%;
	}

	.track__index {
		grid-area: index;

		display: grid;
		place-content: center;

		padding: 1.5rem;
		background: var(--surface-3);
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