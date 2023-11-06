<script lang="ts">
	import type { PageData } from "./$types";

	import Track from "$lib/components/track.svelte";

	export let data: PageData;

	$: tracks = data.tracks?.items ?? [];
</script>

<svelte:head>
	<title>Tracks | Portify</title>
</svelte:head>

<div class="content">
	<h2 class="content__title">Top Tracks</h2>
	<ol class="content__items">
		{#each tracks as track (track.id)}
			<li class="content__item">
				<Track {track} />
			</li>
		{/each}
	</ol>
</div>
