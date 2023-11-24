import type { SimplifiedArtist, Album } from "$lib/typings/spotify";

/**
 * Are all playlist items part of a group, such as a mix?
 */
export function tracksShareArtist(album: Album | null) {
	if (!album) return false;
	if (album?.album_type === "single") return true;

	const flattenNames = (artists: SimplifiedArtist[]) => {
		return artists.map((artist) => artist.name).toString();
	};

	const albumArtists = flattenNames(album.artists);
	const trackArtists = album.tracks.items.map((track) => flattenNames(track.artists));

	return trackArtists.every((artist) => artist === albumArtists);
}

export const getAlbumItemProps = (album: Album) => ({
	href: `/app/albums/${album.id}`,
	imgUrl: album.images.at(0)?.url,
});

export function getAlbumLinks(album: Album | null) {
	if (!album) return;

	return {
		spotify: album.external_urls.spotify,
		bandcamp: `https://www.bandcamp.com/search?q=${album.name}`,
		beatport: `https://www.beatport.com/search?q=${album.name}`,
	};
}
