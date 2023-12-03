<script lang="ts">
	import type { PageData } from "./$types";

	import App from "$lib/components/app.svelte";

	export let data: PageData;

	console.log({ data });
</script>

<App avatar={data.avatar}>
	<div class="content">
		<div class="credits">
			<h2>Credits</h2>
			<article class="credit credit--intro">
				<p>
					I made Portify not just to meet a practical need, but because I wanted to learn about new
					ways of building apps.
				</p>
				<p>
					All these libraries and frameworks share a theme in common: a focus on web standards and
					user-oriented values like performance and accessibility; elegant, intuitive APIs; and a
					fresh take on the developer experience.
				</p>
				<p>
					I'm immensely grateful to the authors for their work, and for making it available to the
					community:
				</p>
			</article>

			<article class="credit">
				<header>
					<enhanced:img
						class="logo square loaded"
						alt="Spotify logo"
						src="../../../static/img/logos/spotify.png"
					/>
					<h3>Spotify TypeScript SDK</h3>
				</header>
				<p>
					This year's build was inspired by the announcement of the <a
						href="https://developer.spotify.com/blog/2023-07-03-typescript-sdk"
					>
						Spotify TypeScript SDK
					</a>
					by my super-talented friend
					<a href="https://bsky.app/profile/thisisjofrank.bsky.social">Jo Franchetti</a>.
				</p>
				<p>
					The comprehensive type definitions didn't just make working with paged data a breeze but
					actually inspired the super simple infinite scroll implementation. Fantastic work.
				</p>
			</article>

			<article class="credit">
				<header>
					<img class="logo square loaded" alt="SvelteKit logo" src="/img/logos/svelte.svg" />
					<h3>SvelteKit</h3>
				</header>
			</article>

			<article class="credit">
				<header>
					<img class="logo square loaded" alt="Lucia logo" src="/img/logos/melt-ui.svg" />
					<h3>Melt UI</h3>
				</header>
			</article>

			<article class="credit">
				<header>
					<img class="logo square loaded" alt="Lucia logo" src="/img/logos/lucia.svg" />
					<h3>Lucia Auth</h3>
				</header>
			</article>

			<article class="credit">
				<header>
					<enhanced:img
						class="logo square loaded"
						alt="Spotify logo"
						src="../../../static/img/logos/turso.png"
					/>
					<h3>Turso DB</h3>
				</header>
			</article>

			<article class="credit">
				<header>
					<img class="logo square loaded" alt="Lucia logo" src="/img/logos/drizzle-orm.svg" />
					<h3>Drizzle ORM</h3>
				</header>
			</article>

			<article class="credit">
				<header>
					<img class="logo square loaded" alt="Open Props logo" src="/img/logos/open-props.svg" />
					<h3>Open Props</h3>
				</header>
			</article>
		</div>
	</div>
</App>

<style lang="postcss">
	.content {
		align-content: start;
		gap: 1rem;

		height: 100%;
		overflow: hidden auto;
	}

	.credits {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: 1rem;

		max-width: 1024px;
		margin: auto;

		& h2 {
			grid-column: 1 / -1;
		}
	}

	.credit {
		display: grid;
		align-content: start;
		gap: 1rem;

		padding: 1rem;
		background: var(--surface-4);

		&.credit--intro {
			padding: 0;
			background: none;
		}

		& header {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		& p a {
			text-decoration: underline;
		}
	}

	.logo {
		width: 4rem;
		height: 4rem;
	}
</style>
