<script lang="ts">
	import type { PageData } from "./$types";

	import Track from "$lib/components/track.svelte";

	export let data: PageData;

	$: tracks = data.tracks?.items ?? [];
</script>

<div class="content">
	<ol class="content__items">
		{#each tracks as track (track.id)}
			<li class="content__item">
				<Track {track} />
			</li>
		{/each}
	</ol>
</div>
