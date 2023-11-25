<script lang="ts">
	import Icon from "./icon.svelte";

	export let links: Record<"spotify" | "bandcamp" | "beatport", string> | undefined;
</script>

{#if links}
	<div class="links">
		<Icon id="icon-link-external" />
		<ul>
			<li>
				<a href={links.spotify} class="square" target="_blank">
					<Icon id="logo-spotify" />
					<span class="sr-only">View on Spotify</span>
				</a>
			</li>
			<li>
				<a href={links.bandcamp} class="square" target="_blank">
					<Icon id="logo-bandcamp" />
					<span class="sr-only">View on Bandcamp</span>
				</a>
			</li>
			<li>
				<a href={links.beatport} class="square" target="_blank">
					<Icon id="logo-beatport" />
					<span class="sr-only">View on Beatport</span>
				</a>
			</li>
		</ul>
	</div>
{/if}

<style lang="postcss">
	.links,
	ul {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}
</style>
