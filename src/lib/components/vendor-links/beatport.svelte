<script lang="ts">
	import type { Track } from "$lib/typings/spotify";

	import Icon from "../icon.svelte";

	export let track: Track;

	function getLink(track: Track) {
		const artists = track.artists.map((artist) => artist.name).join(",");
		const url = new URL("https://www.beatport.com/search");
		url.searchParams.set("q", `${artists} ${track.name}`);

		return url.toString();
	}
</script>

<a href={getLink(track)} class="square" target="_blank">
	<Icon id="logo-beatport"></Icon>
	<span class="sr-only">Buy on Beatport</span>
</a>

