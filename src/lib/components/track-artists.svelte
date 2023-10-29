<script lang="ts">
	import type { SimplifiedArtist } from "$lib/typings/spotify";

	import Icon from "./icon.svelte";

	export let artists: SimplifiedArtist[];
</script>

<div class="artists">
	<Icon id="icon-artist" />
	<ul>
		{#each artists as artist}
			<li><a href="/app/artists/{artist.id}">{artist.name}</a></li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.artists {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0.5rem;

		& li {
			display: inline;

			&:not(:last-child)::after {
				content: ", ";
			}
		}
	}
</style>
