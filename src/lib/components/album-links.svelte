<script lang="ts">
	import type { Album } from "$lib/typings/spotify";

	import Icon from "./icon.svelte";

	export let album: Album;

	function getBandcampLink() {
		return `https://bandcamp.com/search?q=${album.name}`;
	}

	function getBeatportLink() {
		return `https://www.beatport.com/search?q=${album.name}`;
	}
</script>

<div class="links">
	<Icon id="icon-album" />
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
