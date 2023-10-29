<script lang="ts">
	export let src: string | undefined = "";
	export let alt: string;
	export let square = true;

	import { onMount } from "svelte";

	let loaded = false;
	let thisImage: HTMLImageElement;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
		};
	});
</script>

<img {src} {alt} class:square class:loaded bind:this={thisImage} loading="lazy" />

<style lang="postcss">
	img {
		opacity: 0;
		transition: 0.25s opacity 0.75s ease-out;

		&.loaded {
			opacity: 1;
		}
	}
</style>
