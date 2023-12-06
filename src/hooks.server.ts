import { redirect, type Handle } from "@sveltejs/kit";

import { auth } from "$lib/server/lucia";

const protectedRoutes = ["/app", "/api"];

function isProtectedRoute(pathname: string) {
	return protectedRoutes.some((route) => pathname.startsWith(route));
}

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === "/") {
		return resolve(event);
	}

	try {
		event.locals.auth = auth.handleRequest(event);
		const session = await event.locals.auth.validate();

		if (session) {
			if (event.url.pathname.startsWith("/login") || event.url.pathname === "/app") {
				throw redirect(303, "/app/playlists");
			}
		} else {
			if (isProtectedRoute(event.url.pathname)) {
				throw redirect(303, "/");
			}
		}

		return resolve(event);
	} catch (error) {
		console.error(error);

		throw redirect(303, "/");
	}
};
