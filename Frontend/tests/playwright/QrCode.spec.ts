import { test, expect } from "@playwright/test";

test.describe("QR Code Creation Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("");
	});

	test("Check Home Page is Reachable", async ({ page }) => {
		await expect(page).toHaveURL("");
	});

	test("Check QR Code Page is Routable", async ({ page }) => {
		await page.goto("/qrcode");
		await expect(page).toHaveURL("/qrcode");
	});
});
