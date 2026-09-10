import { expect, test } from "@playwright/test";

const qrResponse = {
	size: 21,
	matrix: "1".repeat(21 * 21),
};

test.describe("QR Code modal", () => {
	test.beforeEach(async ({ page }) => {
		await page.route("**/api/qrcode/**", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(qrResponse),
			});
		});

		await page.goto("/qrcode");
		await page.getByRole("textbox", { name: "Enter text to generate QR code" }).fill("https://megu.url");
		await page.getByRole("button", { name: "Generate QR Code" }).click();
	});

	test("opens after a QR code is generated", async ({ page }) => {
		const modal = page.locator("div.fixed");

		await expect(modal).toBeVisible();
		await expect(modal.locator('svg[viewBox="0 0 21 21"]')).toBeVisible();
		await expect(modal).toHaveClass(/fixed/);
		await expect(modal).toHaveClass(/inset-0/);
		await expect(page.getByRole("button", { name: "Show QR code" })).toHaveCount(0);
	});

	test("closes and reopens without generating a new QR code", async ({ page }) => {
		const modal = page.locator("div.fixed");
		const closeButton = modal.getByRole("button").first();

		await closeButton.click();
		await expect(modal).toBeHidden();
		await expect(page.getByRole("button", { name: "Show QR code" })).toBeVisible();

		await page.getByRole("button", { name: "Show QR code" }).click();
		await expect(modal).toBeVisible();
		await expect(modal.locator('svg[viewBox="0 0 21 21"]')).toBeVisible();
	});

	test("centers the modal and anchors the reopen button to the viewport", async ({ page }) => {
		const modal = page.locator("div.fixed");
		await expect(modal).toHaveClass(/fixed/);
		await expect(modal).toHaveClass(/inset-0/);

		await modal.getByRole("button").first().click();
		const reopenButton = page.getByRole("button", { name: "Show QR code" });
		await expect(reopenButton).toHaveClass(/fixed/);
		await expect(reopenButton).toHaveClass(/right-4/);
		await expect(reopenButton).toHaveClass(/bottom-4/);
	});
});
