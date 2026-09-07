import { describe, expect, it } from "vitest";
import { testSize, testMatrix, testUrl } from "../data";
import useQrCode from "@/hooks/useQrCode";
import { renderHook, act } from "@testing-library/react";

describe("Integration Tests - POST /api/qrcode", () => {
	it("returns response in a successful request from the hook", async () => {
		const { result } = renderHook(() => useQrCode());

		await act(async () => {
			await result.current.create({
				data: testUrl,
				error_correction: "LOW",
			});
		});

		expect(result.current.status).toBe(200);

		const body = result.current.body;
		if (!body) {
			throw new Error("Expected the QR code response body to be defined");
		}

		expect(body.matrix).toBe(testMatrix);
		expect(body.size).toBe(testSize);
	});

	it("returns error response with an invalid ecc from the hook", async () => {
		const { result } = renderHook(() => useQrCode());

		await act(async () => {
			await result.current.create({
				data: "Hello World",
				error_correction: "Invalid",
			});
		});

		expect(result.current.status).toBe(422);

		const error = result.current.error;

		if (!error) {
			throw new Error("Expected the Error response to be defined");
		}

		expect(error.detail[0].msg).toBe("Input should be 'LOW', 'MEDIUM', 'QUARTILE' or 'HIGH'");
	});

	it("returns error response with whitespace in data", async () => {
		const { result } = renderHook(() => useQrCode());

		await act(async () => {
			await result.current.create({
				data: "    ",
			});
		});

		expect(result.current.status).toBe(422);

		const error = result.current.error;

		if (!error) {
			throw new Error("Expected the Error response to be defined");
		}

		expect(error.detail[0].msg).toBe("String should match pattern '\\S'");
	});
});
