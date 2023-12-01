<script lang="ts">
	import { onMount } from "svelte";

	export let src: string | undefined = "";
	export let alt: string;
	export let square = true;

	let img: HTMLImageElement;
	let loaded = false;

	onMount(() => {
		const t = setTimeout(() => (loaded = true), 2000);

		img.onload = () => {
			clearTimeout(t);
			loaded = true;
		};
	});
</script>

<img {src} {alt} class:square class:loaded loading="lazy" bind:this={img} />

<style lang="postcss">
	img {
		opacity: 0;
		transition: opacity 1s;

		&.loaded {
			opacity: 1;
		}
	}
</style>
