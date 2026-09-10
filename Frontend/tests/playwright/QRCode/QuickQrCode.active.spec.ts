import { test, expect } from "@playwright/test";

test.describe("Quick QR Code", () => {
	test.beforeEach(async ({ page }) => {
		await page.route("**/api/urls/**", async (route) => {
			const requestBody = route.request().postDataJSON() as { long_url?: string };
			const isValidUrl = requestBody.long_url === "hello.com";

			if (!isValidUrl) {
				await route.fulfill({
					status: 422,
					contentType: "application/json",
					body: JSON.stringify({
						title: "Invalid URL",
						status: 422,
						detail: "Invalid URL",
					}),
				});
				return;
			}

			await route.fulfill({
				status: 201,
				contentType: "application/json",
				body: JSON.stringify({ code: "abc123", ShortUrl: "https://megu.url/abc123" }),
			});
		});

		await page.goto("/");
	});
	test("Quick QR Code Button Exists on Successful Creation", async ({ page }) => {
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("hello.com");
		await page.getByRole("button", { name: "Explode" }).click();
		await expect(page.getByRole("button", { name: "Generate QR Code", exact: true })).toBeVisible();
	});

	test("Quick QR Code Button Does Not Exist on Invalid Creation", async ({ page }) => {
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("2145.gfgdwer");
		await page.getByRole("button", { name: "Explode" }).click();
		await expect(page.getByRole("button", { name: "Generate QR Code", exact: true })).toHaveCount(0);
	});

	test("Quick QR Button leaves after invalid creation", async ({ page }) => {
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("hello.com");
		await page.getByRole("button", { name: "Explode" }).click();
		await expect(page.getByRole("button", { name: "Generate QR Code", exact: true })).toBeVisible();
		await page.getByRole("textbox", { name: "Example: google.com" }).fill("2145.gfgdwer");
		await page.getByRole("button", { name: "Explode" }).click();
		await expect(page.getByRole("button", { name: "Generate QR Code", exact: true })).toHaveCount(0);
	});
});
