<script lang="ts">
	import type { LayoutData } from "./$types";

	import { page } from "$app/stores";
	import { prefsPanel } from "$lib/stores/ui";

	import App from "$lib/components/app.svelte";

	import Image from "$lib/components/image.svelte";
	import PrefsBtn from "$lib/components/btn-prefs.svelte";
	import RailLinks from "$lib/components/rail-links.svelte";

	import "../../app.postcss";

	export let data: LayoutData;

	const links = [
		{ icon: "icon-playlist", href: "/app/playlists", label: "Playlists" },
		{ icon: "icon-artist", href: "/app/artists", label: "Artists" },
		{ icon: "icon-album", href: "/app/albums", label: "Albums" },
		{ icon: "icon-track", href: "/app/tracks", label: "Tracks" },
	];

	$: currentPath = $page.url.pathname;
	$: isLinkActive = (href: string) => currentPath.startsWith(href);
</script>

<App>
	<svelte:fragment slot="avatar">
		<PrefsBtn onClick={prefsPanel.toggle}>
			<Image src={data.avatar} alt="User avatar" />
		</PrefsBtn>
	</svelte:fragment>

	<svelte:fragment slot="rail-lead">
		<RailLinks {links} {isLinkActive} />
	</svelte:fragment>

	<slot />
</App>
