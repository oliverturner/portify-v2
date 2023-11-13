<script lang="ts">
	import type { KeyNotation } from "$lib/typings/app";

	import { enhance } from "$app/forms";
	import { keyNotation } from "$lib/stores/prefs";

	const notations: Record<KeyNotation, string> = {
		camelot: "Camelot",
		musical: "Musical",
	};

	const onNotationChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		keyNotation.set(target.value as KeyNotation);
	};
</script>

<div class="preferences">
	<div class="preferences__controls">
		<form method="post" action="?/preferences" use:enhance>
			<fieldset>
				<legend class="title">Musical notation</legend>
				<ul class="radioitems">
					{#each Object.entries(notations) as [id, label] (id)}
						<li>
							<input
								id="notation-{id}"
								type="radio"
								name="notation"
								value={id}
								on:change={onNotationChange}
								checked={$keyNotation === id}
							/>
							<label for="notation-{id}"><span>{label}</span></label>
						</li>
					{/each}
				</ul>
			</fieldset>
		</form>
	</div>

	<div class="preferences__footer">
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

	.preferences__controls {
	}

	.preferences__footer {
	}

	.logout {
		display: flex;
	}

	.logout__btn {
		flex: 1;
	}
</style>
