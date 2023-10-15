export function onLoad(event: Event) {
	if (event.target instanceof HTMLImageElement) {
		event.target.classList.add("loaded");
	}
}
