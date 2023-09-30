<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	console.log(data.tracks);
</script>

{#each data.tracks?.items ?? [] as item}
	<p>{item.track.name}</p>
{/each}
