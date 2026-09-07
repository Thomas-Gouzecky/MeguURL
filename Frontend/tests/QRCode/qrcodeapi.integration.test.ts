import { afterEach, describe, expect, it, vi } from "vitest";
import { testSize, testMatrix, testUrl } from "../data";
import useQrCode from "@/hooks/useQrCode";
import { renderHook, act } from "@testing-library/react";

async function createQrCode(request: QrCodeAPIRequest) {
	const { result } = renderHook(() => useQrCode());

	await act(async () => {
		await result.current.create(request);
	});

	return result.current;
}

function expectValidationError(result: ReturnType<typeof useQrCode>, message: string, status = 422) {
	expect(result.status).toBe(status);

	if (!result.error) {
		throw new Error("Expected the Error response to be defined");
	}

	expect(result.error.detail[0].msg).toBe(message);
}

describe("Integration Tests - POST /api/qrcode", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("returns response in a successful request from the hook", async () => {
		const result = await createQrCode({
			data: testUrl,
			error_correction: "LOW",
		});

		expect(result.status).toBe(200);

		const body = result.body;
		if (!body) {
			throw new Error("Expected the QR code response body to be defined");
		}

		expect(body.matrix).toBe(testMatrix);
		expect(body.size).toBe(testSize);
	});

	it.each(["LOW", "MEDIUM", "QUARTILE", "HIGH"])("accepts %s error correction", async (error_correction) => {
		const result = await createQrCode({ data: testUrl, error_correction });

		expect(result.status).toBe(200);
		expect(result.body).not.toBeNull();
	});

	it("returns error response with an invalid ecc from the hook", async () => {
		const result = await createQrCode({
			data: "Hello World",
			error_correction: "Invalid",
		});

		expectValidationError(result, "Input should be 'LOW', 'MEDIUM', 'QUARTILE' or 'HIGH'");
	});

	it("returns error response with whitespace in data", async () => {
		const result = await createQrCode({
			data: "    ",
		});

		expectValidationError(result, "String should match pattern '\\S'");
	});

	it("returns error response with an empty data value", async () => {
		const result = await createQrCode({ data: "" });

		expectValidationError(result, "String should have at least 1 character");
	});

	it("returns error response when data is missing", async () => {
		const result = await createQrCode({} as QrCodeAPIRequest);

		expect(result.status).toBe(400);
		expect(result.error).not.toBeNull();
	});

	it("clears the previous error after a successful request", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify({ detail: [{ msg: "Invalid QR code data" }] }), {
					status: 422,
				}),
			)
			.mockResolvedValueOnce(
				new Response(JSON.stringify({ size: testSize, matrix: testMatrix }), { status: 200 }),
			);

		vi.stubGlobal("fetch", fetchMock);
		const { result } = renderHook(() => useQrCode());

		await act(async () => {
			await result.current.create({ data: "invalid" });
		});
		expect(result.current.error).not.toBeNull();

		await act(async () => {
			await result.current.create({ data: testUrl, error_correction: "LOW" });
		});

		expect(result.current.error).toBeNull();
		expect(result.current.body).not.toBeNull();
	});

	it("returns service unavailable error if the service is not active", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ detail: [{ msg: "QR Code Service is currently unavailable" }] }), {
				status: 503,
			}),
		);

		vi.stubGlobal("fetch", fetchMock);

		const result = await createQrCode({
			data: testUrl,
			error_correction: "LOW",
		});

		expectValidationError(result, "QR Code Service is currently unavailable", 503);
	});

	it("returns backend unavailable error if the .NET backend is not active", async () => {
		const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));

		vi.stubGlobal("fetch", fetchMock);

		const result = await createQrCode({
			data: testUrl,
			error_correction: "LOW",
		});

		expect(result.body).toBeNull();
		expectValidationError(result, "Backend is currently unavailable", 503);
	});
});
