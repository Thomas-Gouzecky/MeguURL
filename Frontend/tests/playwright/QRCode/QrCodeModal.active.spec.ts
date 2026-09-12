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
		await page.getByRole("textbox", { name: "Example: MeguURL" }).fill("https://megu.url");
		await page.getByRole("button", { name: "Generate QR Code" }).click();
	});

	test("opens after a QR code is generated", async ({ page }) => {
		const modal = page.locator("div.fixed.inset-0");

		await expect(modal).toBeVisible();
		await expect(modal.locator('svg[shape-rendering="crispEdges"]')).toBeVisible();
		await expect(modal).toHaveClass(/fixed/);
		await expect(modal).toHaveClass(/inset-0/);
		await expect(page.getByRole("button", { name: "Show QR code" })).toHaveCount(0);
	});

	test("closes and reopens without generating a new QR code", async ({ page }) => {
		const modal = page.locator("div.fixed.inset-0");
		const closeButton = modal.getByRole("button").first();

		await closeButton.click();
		await expect(modal).toBeHidden();
		await expect(page.getByRole("button", { name: "Show QR code" })).toBeVisible();

		await page.getByRole("button", { name: "Show QR code" }).click();
		await expect(modal).toBeVisible();
		await expect(modal.locator('svg[shape-rendering="crispEdges"]')).toBeVisible();
	});

	test("centers the modal and anchors the reopen button to the viewport", async ({ page }) => {
		const modal = page.locator("div.fixed.inset-0");
		await expect(modal).toHaveClass(/fixed/);
		await expect(modal).toHaveClass(/inset-0/);

		await modal.getByRole("button").first().click();
		const reopenButton = page.locator("div.fixed.right-4.bottom-4");
		await expect(reopenButton).toBeVisible();
	});

	test("animates the modal into view", async ({ page }) => {
		const modal = page.locator("div.fixed.inset-0");

		await expect(modal).toBeVisible();
		await expect.poll(async () => modal.evaluate((element) => Number(getComputedStyle(element).opacity))).toBe(1);
		await expect.poll(async () => modal.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
	});

	test("animates the modal out before showing the reopen button", async ({ page }) => {
		const modal = page.locator("div.fixed.inset-0");
		await modal.getByRole("button").first().click();

		await expect(modal).toHaveCount(1);
		await expect(page.getByRole("button", { name: "Show QR code" })).toBeVisible();
		await expect(modal).toBeHidden();

		const reopenButton = page.locator("div.fixed.right-4.bottom-4");
		await expect(reopenButton).toBeVisible();
		await expect
			.poll(async () => reopenButton.evaluate((element) => Number(getComputedStyle(element).opacity)))
			.toBe(1);
		await expect
			.poll(async () => reopenButton.evaluate((element) => getComputedStyle(element).transform))
			.toBe("none");
	});

	test("rotates the close icon on hover", async ({ page }) => {
		const modal = page.locator("div.fixed.inset-0");
		const closeButton = modal.getByRole("button").first();

		await closeButton.hover();
		await expect
			.poll(async () => closeButton.evaluate((element) => getComputedStyle(element).transform))
			.not.toBe("none");
	});
});
