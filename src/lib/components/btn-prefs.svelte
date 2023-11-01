<script lang="ts">
	import Image from "./image.svelte";

	export let onClick: () => void;
</script>

<button class="prefs-btn" title="User preferences" on:click={onClick}>
	<slot />
	<span class="sr-only">Preferences</span>
</button>

<style lang="postcss">
	.prefs-btn {
		--size: 40px;

		all: unset;

		aspect-ratio: 1;
		overflow: hidden;

		width: var(--size);
		height: var(--size);
		border-radius: var(--size);
		cursor: pointer;
	}
</style>
