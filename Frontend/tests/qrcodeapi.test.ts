import { describe, expect, it, vi } from "vitest";
import { testSize, testMatrix, testUrl } from "./data";
import { POST } from "../api/QrCode";

describe("POST /api/qrcode", () => {
	it("returns the Mock QR Code", async () => {
		// Fake response (the response im expecting)
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(
				new Response(
					JSON.stringify({
						size: testSize,
						matrix: testMatrix,
					}),
					{ status: 200 },
				),
			),
		);

		// Make the actual request

		const response = await POST({ data: testUrl, error_correction: "LOW" });

		expect(response.status).toBe(200);

		const body = await response.json();

		expect(body.matrix).toEqual(testMatrix);
		expect(body.size).toEqual(testSize);

		vi.unstubAllGlobals();
	});
});

describe("POST /api/qrcode", () => {
	it("returns the real QR Code", async () => {
		const response = await POST({ data: testUrl, error_correction: "LOW" });

		expect(response.status).toBe(200);

		const body = await response.json();

		expect(body.matrix).toEqual(testMatrix);
		expect(body.size).toEqual(testSize);
	});
});
