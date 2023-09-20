<script lang="ts">
	import { AppShell, AppBar } from "@skeletonlabs/skeleton";

	import "../../app.postcss";
</script>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Portify</strong>
			</svelte:fragment>

			<svelte:fragment slot="trail"></svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
