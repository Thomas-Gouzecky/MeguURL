import { test, expect } from "@playwright/test";

test.describe("Quick QR Code", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("");
	});
	test("Quick QR Code Button Exists on Successful Creation", async ({ page }) => {
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("hello.com");
		await page.getByRole("button", { name: "Explode" }).click();
		await expect(page.getByRole("button", { name: "Generate QR Code" })).toBeVisible();
	});

	test("Quick QR Code Button Does Not Exist on Invalid Creation", async ({ page }) => {
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("2145.gfgdwer");
		await page.getByRole("button", { name: "Explode" }).click();
		await expect(page.getByRole("button", { name: "Generate QR Code" })).not.toBeVisible();
	});

	test("Quick QR Button leaves after invalid creation", async ({ page }) => {
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("hello.com");
		await page.getByRole("button", { name: "Explode" }).click();
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("2145.gfgdwer");
		await page.getByRole("button", { name: "Explode" }).click();
		await expect(page.getByRole("button", { name: "Generate QR Code" })).not.toBeVisible();
	});
});
