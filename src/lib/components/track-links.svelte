<script lang="ts">
	import type { SimplifiedTrack, Track } from "$lib/typings/spotify";

	import BandcampLink from "./vendor-links/bandcamp.svelte";
	import BeatportLink from "./vendor-links/beatport.svelte";
	import Icon from "./icon.svelte";

	export let track: Track | SimplifiedTrack;
</script>

<div class="links">
	<Icon id="icon-shopping-bag" />
	<ul>
		<li><BandcampLink {track} /></li>
		<li><BeatportLink {track} /></li>
	</ul>
</div>

<style lang="postcss">
	.links, ul, li {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
