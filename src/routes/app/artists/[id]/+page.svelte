<script lang="ts">
	import Cover from "$lib/components/cover.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	console.log(data);
	$: genres = (data.artist?.genres ?? []).join(", ");
</script>

{#if data.artist}
	<Cover type="artist" imgUrl={data.artist.images[0]?.url} title={data.artist.name}>
		<svelte:fragment slot="description">
			{#if genres.length > 0}
				<p class="genres"><span class="label">Genres</span> {genres}</p>
			{/if}
		</svelte:fragment>
	</Cover>
{/if}

<style lang="postcss">
	.genres {
		white-space: nowrap;
		text-transform: capitalize;
	}
</style>
