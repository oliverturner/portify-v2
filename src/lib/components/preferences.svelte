<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<div class="preferences">
	<div class="preferences__controls">
		<form method="post" action="?/preferences" use:enhance>
			<fieldset>
				<legend class="title">Musical notation</legend>
				<ul class="radioitems">
					<li>
						<input id="notation-camelot" type="radio" name="notation" value="camelot" checked />
						<label for="notation-camelot"><span>Camelot</span></label>
					</li>
					<li>
						<input id="notation-musical" type="radio" name="notation" value="musical" />
						<label for="notation-musical"><span>Musical</span></label>
					</li>
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
	fieldset {
		border: none;
		margin: 0;
		padding: 1rem 0;
	}

	.radioitems {
		display: grid;
		gap: 0.5rem;

		& li {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

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
