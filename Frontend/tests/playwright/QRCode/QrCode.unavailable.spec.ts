import { test, expect } from "@playwright/test";

test.describe("QR Code Creation Page - Mock Services", () => {
	test("Check Status Message shows correct error for the QR Service being unavailable", async ({ page }) => {
		const errorMessage = "The qrcode service could not be reached.";

		await page.route("**/api/qrcode/**", async (route) => {
			await route.fulfill({
				status: 503,
				contentType: "application/json",
				body: JSON.stringify({
					title: "Service Unavailable",
					status: 503,
					detail: errorMessage,
				}),
			});
		});

		await page.goto("/qrcode");
		await page.getByRole("textbox", { name: "Example: MeguURL" }).fill("mock request");

		const responsePromise = page.waitForResponse(
			(response) => response.url().includes("/api/qrcode/") && response.status() === 503,
		);
		await page.getByRole("button", { name: "Generate QR Code" }).click();
		await responsePromise;

		const statusButton = page.locator("form button").first();
		await statusButton.hover();
		await expect(page.locator("form")).toContainText(errorMessage);
	});

	test("Check Status Message shows correct error for the backend service being unavailable", async ({ page }) => {
		const errorMessage = "Backend is currently unavailable";

		await page.route("**/api/qrcode/**", async (route) => {
			await route.abort("failed");
		});

		await page.goto("/qrcode");
		await page.getByRole("textbox", { name: "Example: MeguURL" }).fill("mock request");
		await page.getByRole("button", { name: "Generate QR Code" }).click();

		const statusButton = page.locator("form button").first();
		await statusButton.hover();
		await expect(page.locator("form")).toContainText(errorMessage);
	});
});
