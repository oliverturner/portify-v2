<script lang="ts">
	import type { PageData } from "./$types";

	import App from "$lib/components/app.svelte";

	export let data: PageData;
</script>

<svelte:head>
	<title>Credits | Portify</title>
</svelte:head>

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
					community...
				</p>
			</article>

			<article id="spotify" class="credit">
				<header>
					<enhanced:img
						class="logo square loaded"
						alt="Spotify logo"
						src="../../../static/img/logos/spotify.png"
					/>
					<h3>
						<a href="https://developer.spotify.com/blog/2023-07-03-typescript-sdk">
							Spotify TypeScript SDK
						</a>
					</h3>
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

			<article id="svelte" class="credit">
				<header>
					<img class="logo square loaded" alt="SvelteKit logo" src="/img/logos/svelte.svg" />
					<h3>
						<a href="https://kit.svelte.dev/">SvelteKit</a>
					</h3>
				</header>
				<p>
					I genuinely love working with <a href="https://svelte.dev/">Svelte</a> and
					<a href="https://kit.svelte.dev/">SvelteKit</a>: the combination makes the challenging
					easy and the features just keep getting better (hello
					<a href="https://svelte.dev/blog/runes">Runes!</a>).
				</p>
				<p>
					As much as I love <a href="https://astro.build/">Astro</a>, and as much as I want to keep
					exploring options like <a href="https://enhance.dev/">Enhance</a>, for an app like Portify
					it's genuinely difficult to imagine any other combination being as rewarding.
				</p>
			</article>

			<article id="melt-ui" class="credit">
				<header>
					<img class="logo square loaded" alt="Lucia logo" src="/img/logos/melt-ui.svg" />
					<h3>
						<a href="https://www.melt-ui.com/">Melt UI</a>
					</h3>
				</header>
				<p>
					I'm delighted to see a component library matching Radix in quality brought to Svelte.
					<a href="https://www.melt-ui.com/">Melt UI</a>'s builder pattern combines power with
					simplicity and the components are built with accessibility as a primary concern. Really
					impressive stuff.
				</p>
				<p>Bonus: being a headless UI library, it doesn't impose Tailwind on me.</p>
			</article>

			<article id="lucia-auth" class="credit">
				<header>
					<img class="logo square loaded" alt="Lucia logo" src="/img/logos/lucia.svg" />
					<h3>
						<a href="https://lucia-auth.com/">Lucia Auth</a>
					</h3>
				</header>
				<p>
					A library I just know I'll keep coming back to. OAuth may be more fiddly than hard, but
					<a href="https://lucia-auth.com/">Lucia</a> does an amazing job of making the fiddly simple.
				</p>
				<p>
					The radical minimalism means that you're responsible for managing and refreshing your
					bearer tokens, but I <em>really</em> appreciate the relentless focus on doing the core part
					right.
				</p>
			</article>

			<article id="turso" class="credit">
				<header>
					<enhanced:img
						class="logo square loaded"
						alt="Turso logo"
						src="../../../static/img/logos/turso.png"
					/>
					<h3>
						<a href="https://turso.tech/">Turso DB</a>
					</h3>
				</header>
				<p>
					The convergence of Edge Compute and libSQL's file-as-db architecture means
					<a href="https://turso.tech/">Turso</a>
					can offer 500 databases at the free tier. Just phenomenal.
				</p>
				<p>
					The perfect pairing for Lucia, and so easy to work with that it's almost hard to resist
					the temptation to add more capabilities to your app!
				</p>
			</article>

			<article id="drizzle-orm" class="credit">
				<header>
					<img class="logo square loaded" alt="Drizzle ORM logo" src="/img/logos/drizzle-orm.svg" />
					<h3>
						<a href="https://orm.drizzle.team/">Drizzle ORM</a>
					</h3>
				</header>
				<p>
					Real talk: the lack of database migration tooling for Node that even remotely matched what
					existed as standard for PHP, Python or Ruby was a major drag on me building db-backed
					projects in the past.
				</p>
				<p>I'm so glad I found <a href="https://orm.drizzle.team/">Drizzle</a> 🥰</p>
			</article>

			<article id="open-props" class="credit">
				<header>
					<img class="logo square loaded" alt="Open Props logo" src="/img/logos/open-props.svg" />
					<h3>
						<a href="https://open-props.style/">Open Props</a>
					</h3>
				</header>
				<p>
					Adam Argyle's ever-expanding sub-atomic toolbox for CSS,
					<a href="https://open-props.style/">Open Props</a> gives developers super powers via the medium
					of Custom Properties.
				</p>
				<p>
					Literally the first dependency I add to any project, and a constant source of inspiration
					and learning for me.
				</p>
				<p>If Portify looks nice then Adam is largely to blame.</p>
				<p></p>
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

		max-width: min(1024px, 100%);
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
