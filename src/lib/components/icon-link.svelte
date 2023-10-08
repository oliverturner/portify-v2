<script lang="ts">
	import Icon from "./icon.svelte";

	export let icon: string;
	export let href: string;
	export let stacked: boolean = false;
</script>

<a {href} class:stacked>
	<Icon id={icon} />
	<slot />
</a>

<style lang="postcss">
	a {
		display: grid;
		grid-template-columns: 1.5rem 1fr;
		align-items: center;
		gap: 0.5rem;

		&.stacked {
			grid-template-columns: initial;

			aspect-ratio: 1;
		}
	}
</style>
