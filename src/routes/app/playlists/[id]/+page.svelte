<script lang="ts">
	import type { PageData } from "./$types";

	import Track from "$lib/components/track.svelte";
	import GroupedTrack from "$lib/components/track-grouped.svelte";
	import { isTrack } from "$lib/utils/data";

	export let data: PageData;
</script>

{#if data.playlist}
	<div class="playlist">
		<figure class="cover">
			<img class="cover__art square" src={data.playlist.images[0]?.url} alt="Cover art" />
			<figcaption class="cover__label">
				<h2 class="title title--light">{data.playlist.name}</h2>
			</figcaption>
		</figure>

		<ol class="playlist__items" class:playlist__items--grouped={data.isGrouped}>
			{#each data.playlist.tracks?.items ?? [] as item, index (item.track.id)}
				{#if isTrack(item.track)}
					<li>
						{#if data.isGrouped}
							<GroupedTrack {index} track={item.track} />
						{:else}
							<Track track={item.track} />
						{/if}
					</li>
				{/if}
			{/each}
		</ol>
	</div>
{/if}

<style lang="postcss">
	.playlist {
		display: grid;
	}

	.cover {
		display: grid;
		align-items: end;
		gap: 1rem;

		margin: 0;
		background: #0004;

		@media (min-width: 768px) {
			grid-template-columns: 12rem 1fr;
		}
	}

	.cover__art {
		width: 12rem;
		aspect-ratio: 1;
	}

	.cover__label {
		padding: 0 1rem 1rem;

		@media (min-width: 768px) {
			padding: 1rem 0;
		}
	}

	.playlist__items {
		--_col-width: 450px;
		--_bg: var(--surface-3);
		--_ink: var(--text-2);

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--_col-width), 1fr));
		gap: 1rem;

		padding: 1rem;
		font-size: 0.9rem;

		&.playlist__items--grouped {
			--_col-width: 350px;
			--_bg: var(--surface-5);
		}

		& li {
			background: var(--_bg);
			color: var(--_ink);
		}
	}
</style>
