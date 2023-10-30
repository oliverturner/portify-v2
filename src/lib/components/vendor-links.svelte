<script lang="ts">
	import Icon from "./icon.svelte";

	export let links: Record<"bandcamp" | "beatport", string> | undefined;
</script>

{#if links}
	<div class="links">
		<Icon id="icon-shopping-bag" />
		<ul>
			<li>
				<a href={links.bandcamp} class="square" target="_blank">
					<Icon id="logo-bandcamp" />
					<span class="sr-only">View on Bandcamp</span>
				</a>
			</li>
			<a href={links.beatport} class="square" target="_blank">
				<Icon id="logo-beatport" />
				<span class="sr-only">View on Beatport</span>
			</a>
		</ul>
	</div>
{/if}

<style lang="postcss">
	.links,
	ul,
	li {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
