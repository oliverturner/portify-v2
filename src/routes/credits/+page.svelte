<script lang="ts">
	import type { PageData } from "./$types";

	import App from "$lib/components/app.svelte";

	export let data: PageData;

	console.log({ data });
</script>

<App avatar={data.avatar}>
	<div class="content">
		<h2>Credits</h2>
		<div class="credits">
			<div class="credit credit--intro">
				<p>
					I made Portify not just to meet a need I had, but because I wanted to learn about new ways
					of building apps.
				</p>
				<p>
					I'm grateful to the authors of the following libraries and frameworks for their work, and
					for making it available to the community:
				</p>
			</div>
			<ul>
				<li class="credit">
					<h3>Spotify SDK</h3>
				</li>
				<li class="credit"><h3>SvelteKit</h3></li>
				<li class="credit"><h3>Melt UI</h3></li>
				<li class="credit"><h3>Lucia Auth</h3></li>
				<li class="credit"><h3>Turso DB</h3></li>
				<li class="credit"><h3>Drizzle ORM</h3></li>
				<li class="credit"><h3>Open Props</h3></li>
			</ul>
		</div>
	</div>
</App>

<style lang="postcss">
	.content {
		align-content: start;
		gap: 1rem;

		height: 100%;
		overflow: hidden auto;
		max-width: 1024px;
		margin: auto;
	}

	.credits {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: 1rem;
	}

	ul {
		display: contents;
	}

	.credit {
		padding: 1rem;
		background: var(--surface-4);

		&.credit--intro {
			grid-row: 1 / 3;
		}
	}
</style>
