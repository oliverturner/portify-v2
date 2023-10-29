<script lang="ts">
	import type { Artist } from "$lib/typings/spotify";

	import Icon from "./icon.svelte";

	export let artist: Artist;

	function getBandcampLink() {
		return `https://bandcamp.com/search?q=${artist.name}`;
	}

	function getBeatportLink() {
		return `https://www.beatport.com/search?q=${artist.name}`;
	}
</script>

<div class="links">
	<Icon id="icon-artist" />
	<ul>
		<li>
			<a href={getBandcampLink()} class="square" target="_blank">
				<Icon id="logo-bandcamp"></Icon>
				<span class="sr-only">View on Bandcamp</span>
			</a>
		</li>
		<a href={getBeatportLink()} class="square" target="_blank">
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
