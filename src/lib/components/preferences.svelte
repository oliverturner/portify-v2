<script lang="ts">
	import type { KeyNotation } from "$lib/typings/app";

	import { enhance } from "$app/forms";
	import { keyNotation } from "$lib/stores/prefs";
	import IconLink from "./icon-link.svelte";

	type KeyDetails = { label: string; sample: string };
	const notations: Record<KeyNotation, KeyDetails> = {
		camelot: { label: "Camelot", sample: "1A" },
		musical: { label: "Musical", sample: "A♭m" },
	} as const;

	const onNotationChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		keyNotation.set(target.value as KeyNotation);
	};
</script>

<div class="preferences">
	<div class="preferences__controls">
		<form method="post" action="?/preferences" use:enhance>
			<fieldset>
				<legend class="title">Notation</legend>
				<ul class="radioitems">
					{#each Object.entries(notations) as [id, details] (id)}
						<li>
							<input
								id="notation-{id}"
								type="radio"
								name="notation"
								value={id}
								on:change={onNotationChange}
								checked={$keyNotation === id}
							/>
							<label class="notation" for="notation-{id}">
								<span>{details.label}</span>
								<span class="notation__sample">{details.sample}</span>
							</label>
						</li>
					{/each}
				</ul>
			</fieldset>
		</form>
	</div>

	<div class="preferences__footer">
		<ul class="extras">
			<li>
				<IconLink href="/credits" icon="icon-heart">
					<span>Credits</span>
				</IconLink>
			</li>
			<li>
				<IconLink href="https://github.com/oliverturner/portify-v2" icon="logo-github">
					<span>Source on GitHub</span>
				</IconLink>
			</li>
		</ul>

		<form class="logout" method="post" action="?/logout" use:enhance>
			<button class="logout__btn btn">Sign out</button>
		</form>
	</div>
</div>

<style lang="postcss">
	.preferences {
		display: grid;
		grid-template-rows: 1fr auto;

		height: 100%;
	}

	.radioitems {
		& > li {
			display: flex;
			align-items: center;
		}
	}

	.notation {
		flex: 1;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.notation__sample {
		padding: 0.25rem;
		border: 1px solid;
		border-radius: 0.25rem;
		font-size: small;
		color: var(--brand);
	}

	.preferences__controls {
	}

	.preferences__footer {
		display: grid;
		gap: 2rem;
	}

	.extras {
		display: grid;
		gap: 1rem;

		& a:hover {
			text-decoration: underline;
		}
	}

	.logout {
		display: grid;
	}
</style>
