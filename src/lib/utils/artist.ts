import type { Artist, SimplifiedArtist } from "$lib/typings/spotify";

export function getArtistNames(artists: (Artist | SimplifiedArtist)[] = []) {
	return artists.map((artist) => artist.name).join(", ");
}

export function getArtistIds(artists: (Artist | SimplifiedArtist)[] = []) {
	return artists.map((artist) => artist.id).join(",");
}

export const getArtistItemProps = (item: Artist) => ({
	href: `/app/artists/${item.id}`,
	imgUrl: item.images.at(0)?.url,
});
