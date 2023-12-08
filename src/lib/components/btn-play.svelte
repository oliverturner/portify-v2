<script lang="ts">
	import Icon from "./icon.svelte";

	export let onClick: () => void;
</script>

<button class="playbtn" on:click={onClick}>
	<Icon id="icon-play-btn" />
	<span class="sr-only">Play</span>
</button>

<style lang="postcss">
	.playbtn {
		--_highlight-dark: #fff4;
	}
</style>
