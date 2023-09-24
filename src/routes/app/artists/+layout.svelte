<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="page">
	<ul class="page__nav">
		{#each data.artists?.items ?? [] as item}
			<li>
				<a href="/app/artists/{item.id}">{item.name}</a>
			</li>
		{/each}
	</ul>
	<div class="page__content">
		<slot />
	</div>
</div>
