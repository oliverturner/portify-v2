import { redirect, type Handle } from "@sveltejs/kit";

import { auth } from "$lib/server/lucia";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	const session = await event.locals.auth.validate();

	if (session) {
		if (event.url.pathname.startsWith("/login")) {
			throw redirect(303, "/app");
		}
	} else {
		if (event.url.pathname.startsWith("/app")) {
			throw redirect(303, "/");
		}
	}

	return await resolve(event);
};
