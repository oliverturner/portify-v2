<script lang="ts">
	import type { SimplifiedTrack, Track } from "$lib/typings/spotify";

	import Icon from "../icon.svelte";

	export let track: Track | SimplifiedTrack;

	function getLink(track: Track | SimplifiedTrack) {
		const artists = track.artists[0].name;
		const url = new URL("https://bandcamp.com/search");
		url.searchParams.set("q", `${artists} ${track.name}`);

		return url.toString();
	}
</script>

<a href={getLink(track)} class="square" target="_blank">
	<Icon id="logo-bandcamp"></Icon>
	<span class="sr-only">Buy on Bandcamp</span>
</a>
