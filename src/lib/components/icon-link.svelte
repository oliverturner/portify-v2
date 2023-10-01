<script lang="ts">
	import Icon from "./icon.svelte";

	export let icon: string;
	export let href: string;
</script>

<a {href}>
	<Icon id={icon} />
	<slot />
</a>

<style>
	a {
		display: grid;
		grid-template-columns: 1.5rem 1fr;
		align-items: center;
		gap: 0.5rem;
	}
</style>
