import { expect, test } from "@playwright/test";

test("index page has expected h1", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { name: "Portify" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Splash Spotify logo Click!" })).toBeVisible();
});

test.describe("routes are protected", () => {
	test("/app", async ({ page }) => {
		await page.goto("/apps/playlists");
		await page.waitForURL("/");
		await expect(page.getByRole("heading", { name: "Portify" })).toBeVisible();
		await expect(page.getByRole("link", { name: "Splash Spotify logo Click!" })).toBeVisible();
	});

	test("/api", async ({ page }) => {
		await page.goto("/api/albums");
		await page.waitForURL("/");
		await expect(page.getByRole("heading", { name: "Portify" })).toBeVisible();
		await expect(page.getByRole("link", { name: "Splash Spotify logo Click!" })).toBeVisible();
	});
});
