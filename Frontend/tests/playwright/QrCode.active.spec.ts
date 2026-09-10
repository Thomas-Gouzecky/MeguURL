import { test, expect } from "@playwright/test";

test.describe("QR Code Creation Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/qrcode");
	});

	test("Check Home Page is Reachable", async ({ page }) => {
		await page.goto("");
		await expect(page).toHaveURL("");
	});

	test("Check QR Code Page is Routable", async ({ page }) => {
		await expect(page).toHaveURL("/qrcode");
		await expect(page).toHaveTitle("MeguQR");
	});

	test("Check QR Code Link is in Navbar", async ({ page }) => {
		const Navbar = page.locator("div").nth(1);
		await page.goto("");
		expect(Navbar.getByRole("link", { name: "MeguQR" })).toBeTruthy();
		await Navbar.getByRole("link", { name: "MeguQR" }).click();
		await expect(page).toHaveURL("/qrcode");
		await expect(page).toHaveTitle("MeguQR");
	});

	test("Check Navbar Link is Disabled when at /qrcode", async ({ page }) => {
		const Navbar = page.locator("div").nth(1);
		await expect(Navbar.getByRole("link", { name: "MeguQR" })).toBeDisabled();
	});

	test("Check Status is not visible on load", async ({ page }) => {
		const status = page.locator(".flex.size-10");
		await expect(status).toBeEmpty();
	});

	test("Check Status Message shows correct error for no input", async ({ page }) => {
		const status = page.locator(".flex.size-10");
		await page.getByRole("button", { name: "Generate QR Code" }).click();
		await expect(status).toBeVisible();
		await page.getByRole("main").getByRole("button").filter({ hasText: /^$/ }).click();
		await expect(page.locator("form")).toContainText("String should have at least 1 character");
	});

	test("Check Status shows success on successful input", async ({ page }) => {
		const status = page.locator(".flex.size-10");
		await page.getByRole("textbox", { name: "Enter text to generate QR code" }).fill("hello world");
		await page.getByRole("button", { name: "Generate QR Code" }).click();
		await expect(status).toBeVisible();
		await page.getByRole("main").getByRole("button").filter({ hasText: /^$/ }).click();
		await expect(page.locator("form")).toContainText("Success!");
	});
});
