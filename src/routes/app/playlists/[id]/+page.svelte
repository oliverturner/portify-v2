<script lang="ts">
	import type { PageData } from "./$types";

	import Track from "$lib/components/track.svelte";
	import { isTrack } from "$lib/utils/data";

	export let data: PageData;

	let index = 1;

	function getIndex() {
		return index++;
	}

	console.log({ "playlistPage.playlist": data.playlist });
</script>

{#if data.playlist}
	<div class="playlist grid">
		<figure class="playlist__cover grid">
			<img class="square" src={data.playlist.images[0]?.url} alt="Cover art" />
			<figcaption>
				<h2>{data.playlist.name}</h2>

				{#if data.playlist.description}
					<p>{data.playlist.description}</p>
				{/if}
			</figcaption>
		</figure>

		<ol class="playlist__items grid">
			{#each data.playlist.tracks?.items ?? [] as item}
				{#if isTrack(item.track)}
					<li><Track index={getIndex()} track={item.track} isGrouped={data.isGrouped} /></li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}

<style lang="postcss">
	.playlist {
	}

	.playlist__cover {
		align-items: end;

		margin: 0;
		background: #0004;

		@media (min-width: 768px) {
			grid-template-columns: 12rem 1fr;
		}

		& img {
			width: 12rem;
			aspect-ratio: 1;
		}

		& figcaption {
			padding: 0 1rem 1rem;

			@media (min-width: 768px) {
				padding: 1rem 0;
			}
		}
	}

	.playlist__items {
		grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
	}
</style>
