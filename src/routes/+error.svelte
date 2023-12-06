<script>
	import { page } from "$app/stores";

	console.log($page.error);
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<style lang="postcss">
	h1 {
		align-self: center;
		grid-area: 1 / 1 / -1 / -1;

		text-align: center;
	}
</style>
