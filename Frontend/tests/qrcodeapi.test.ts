import { describe, expect, it, vi } from "vitest";
import { testSize, testMatrix, testUrl } from "./data";
import { generateQrCode } from "../api/QrCode";

describe("POST /api/qrcode", () => {
	it("returns successful response from Mock QR Code", async () => {
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

		// Make the request
		const response = await generateQrCode({ data: testUrl, error_correction: "LOW" });

		expect(response.status).toBe(200);

		const body = await response.json();

		expect(body.matrix).toEqual(testMatrix);
		expect(body.size).toEqual(testSize);

		vi.unstubAllGlobals();
	});

	it("returns the successful response from QR Code service", async () => {
		const response = await generateQrCode({ data: testUrl, error_correction: "LOW" });

		expect(response.status).toBe(200);

		const body = await response.json();

		expect(body.matrix).toEqual(testMatrix);
		expect(body.size).toEqual(testSize);
	});

	it("returns the successful response from service with no error_correction field", async () => {
		const response = await generateQrCode({ data: testUrl });

		expect(response.status).toBe(200);

		const body = await response.json();

		expect(body.matrix).toEqual(testMatrix);
		expect(body.size).toEqual(testSize);
	});
});
