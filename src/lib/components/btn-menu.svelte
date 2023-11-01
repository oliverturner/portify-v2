<script lang="ts">
	import Icon from "./icon.svelte";

	export let onClick: () => void;
</script>

<button class="square btn--menu" on:click={onClick}>
	<Icon id="icon-menu" />
	<span class="sr-only"></span>
</button>

<style lang="postcss">
	.btn--menu {
		--size: 40px;

		display: grid;
		place-content: center;

		width: var(--size);
		height: var(--size);
		border-color: currentColor;
		border-width: 1px;
		border-radius: var(--size);

		@media (min-width: 1024px) {
			display: none;
		}
	}
</style>
