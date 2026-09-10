import { afterEach, describe, expect, it, vi } from "vitest";
import { testSize, testMatrix, testUrl } from "../data";
import { generateQrCode } from "@/api/QrCode";

describe("Unit Tests - POST /api/qrcode", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("sends the request and returns the successful QR code response", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(new Response(JSON.stringify({ size: testSize, matrix: testMatrix }), { status: 200 }));
		vi.stubGlobal("fetch", fetchMock);

		const response = await generateQrCode({ data: testUrl, error_correction: "LOW" });

		expect(response.status).toBe(200);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringContaining("/api/qrcode/"),
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: testUrl, error_correction: "LOW" }),
			}),
		);

		const body = await response.json();

		expect(body.matrix).toEqual(testMatrix);
		expect(body.size).toEqual(testSize);
	});

	it("omits error_correction when it is not provided", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(new Response(JSON.stringify({ size: testSize, matrix: testMatrix }), { status: 200 }));
		vi.stubGlobal("fetch", fetchMock);

		const response = await generateQrCode({ data: testUrl });

		expect(response.status).toBe(200);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringContaining("/api/qrcode/"),
			expect.objectContaining({ body: JSON.stringify({ data: testUrl }) }),
		);
	});

	it("preserves an error response from the QR code service", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(new Response(JSON.stringify({ detail: "Invalid QR code data" }), { status: 422 }));
		vi.stubGlobal("fetch", fetchMock);

		const response = await generateQrCode({ data: "not a valid url" });

		expect(response.status).toBe(422);

		const body = await response.json();

		expect(body).toEqual({ detail: "Invalid QR code data" });
	});

	it("preserves a server error response from the QR code service", async () => {
		const errorBody = { detail: "Internal server error" };
		const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(errorBody), { status: 500 }));
		vi.stubGlobal("fetch", fetchMock);

		const response = await generateQrCode({ data: testUrl });

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual(errorBody);
	});

	it("returns backend unavailable error if the .NET backend is not active", async () => {
		const errorBody = { detail: [{ msg: "Backend is currently unavailable" }] };
		const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));

		vi.stubGlobal("fetch", fetchMock);

		const response = await generateQrCode({
			data: testUrl,
			error_correction: "LOW",
		});

		expect(response.status).toBe(503);
		expect(await response.json()).toEqual(errorBody);
	});
});
