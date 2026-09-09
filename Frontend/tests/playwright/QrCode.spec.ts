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
		await expect(page).toHaveTitle("MeguQR");
	});

	test("Check QR Code Link is in Navbar", async ({ page }) => {
		const Navbar = page.locator("div").nth(1);
		expect(Navbar.getByRole("link", { name: "MeguQR" })).toBeTruthy();
		await Navbar.getByRole("link", { name: "MeguQR" }).click();
		await expect(page).toHaveURL("/qrcode");
		await expect(page).toHaveTitle("MeguQR");
	});

	test("Check Navbar Link is Disabled when at /qrcode", async ({ page }) => {
		const Navbar = page.locator("div").nth(1);
		await page.goto("/qrcode");
		await expect(Navbar.getByRole("link", { name: "MeguQR" })).toBeDisabled();
	});
});
