<script lang="ts">
	import type { Artist } from "$lib/typings/spotify";

	import Icon from "./icon.svelte";

	export let artist: Artist;

	function getBandcampLink(artist: Artist) {
		return `https://bandcamp.com/search?q=${artist.name}`;
	}

	function getBeatportLink(artist: Artist) {
		return `https://www.beatport.com/search?q=${artist.name}`;
	}
</script>

<div class="links">
	<Icon id="icon-artist" />
	<ul>
		<li>
			<a href={getBandcampLink(artist)} class="square" target="_blank">
				<Icon id="logo-bandcamp"></Icon>
				<span class="sr-only">View on Bandcamp</span>
			</a>
		</li>
		<a href={getBeatportLink(artist)} class="square" target="_blank">
			<Icon id="logo-beatport"></Icon>
			<span class="sr-only">View on Beatport</span>
		</a>
	</ul>
</div>

<style lang="postcss">
	.links,
	ul,
	li {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
