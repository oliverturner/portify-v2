<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	console.log({ root: data });
</script>

<div class="page">
	<ul class="page__nav">
		{#each data.playlists?.items ?? [] as item}
			<li>
				<a href="/app/playlists/{item.id}">{item.name}</a>
			</li>
		{/each}
	</ul>
	<div class="page__content">

	</div>
</div>
