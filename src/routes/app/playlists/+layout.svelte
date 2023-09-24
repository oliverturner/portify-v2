<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
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
		<slot />
	</div>
</div>


