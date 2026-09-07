import { describe, expect, it } from "vitest";
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

function expectValidationError(result: ReturnType<typeof useQrCode>, message: string) {
	expect(result.status).toBe(422);

	if (!result.error) {
		throw new Error("Expected the Error response to be defined");
	}

	expect(result.error.detail[0].msg).toBe(message);
}

describe("Integration Tests - POST /api/qrcode", () => {
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
});
