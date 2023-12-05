<script lang="ts">
	import Icon from "./icon.svelte";
	import { onPlayBtnClick } from "$lib/utils/player";

	export let trackId: string;
</script>

<button class="playbtn" on:click={() => onPlayBtnClick(trackId)}>
	<Icon id="icon-play-btn" />
	<span class="sr-only">Play</span>
</button>

<style>
	.playbtn {
		--_highlight-dark: #fff4;
	}
</style>
