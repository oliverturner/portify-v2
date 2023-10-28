<script lang="ts">
	import type { Track } from "$lib/typings/spotify";

	import Icon from "../icon.svelte";

	export let track: Track;

	function getLink(track: Track) {
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
