<script>
	// src/routes/blog/[slug]/+page.svelte

	import { page } from "$app/stores";
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<style lang="postcss">
  h1 {
    align-self: center;
    grid-area: 1 / 1 / -1 / -1;

    text-align: center;
  }
</style>
