import { afterEach, describe, expect, it, vi } from "vitest";
import { testUrl } from "../data";
import useQrCode from "@/hooks/useQrCode";
import { renderHook, act } from "@testing-library/react";

describe("Unit Tests - QR Code Image Generation", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("recovers from a failed generation when the next request succeeds", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify({ detail: [{ msg: "Invalid QR code data" }] }), { status: 422 }),
			)
			.mockResolvedValueOnce(
				new Response(JSON.stringify({ size: 21, matrix: "1".repeat(441) }), { status: 200 }),
			);
		vi.stubGlobal("fetch", fetchMock);

		const { result } = renderHook(() => useQrCode());

		await act(async () => {
			await result.current.create({ data: "invalid" });
		});
		expect(result.current.QRCode).toBeNull();
		expect(result.current.error).not.toBeNull();

		await act(async () => {
			await result.current.create({ data: testUrl });
		});

		expect(result.current.QRCode).not.toBeNull();
		expect(result.current.error).toBeNull();
	});
});
