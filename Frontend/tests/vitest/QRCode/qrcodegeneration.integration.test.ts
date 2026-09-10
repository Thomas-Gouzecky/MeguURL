import { afterEach, describe, expect, it, vi } from "vitest";
import { isValidElement } from "react";
import { testUrl } from "../data";
import useQrCode from "@/hooks/useQrCode";
import { renderHook, act } from "@testing-library/react";

async function createQrCode(request: QrCodeAPIRequest) {
	const { result } = renderHook(() => useQrCode());

	await act(async () => {
		await result.current.create(request);
	});

	return result.current;
}

describe("Integration Tests - QRCode Image Generation", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("Successfully Generates an SVG with the input given", async () => {
		const result = await createQrCode({
			data: testUrl,
		});

		expect(isValidElement(result.QRCode)).toBe(true);
		expect(result.QRCode?.type).toBe("svg");
		expect(result.QRCode?.props.viewBox).toBe("0 0 21 21");
		expect(result.QRCode?.props.shapeRendering).toBe("crispEdges");
		expect(result.QRCode?.props.children).toHaveLength(2);
	});

	it("reports loading while QR generation is in progress", async () => {
		let resolveResponse!: (response: Response) => void;
		const pendingResponse = new Promise<Response>((resolve) => {
			resolveResponse = resolve;
		});
		const fetchMock = vi.fn().mockReturnValue(pendingResponse);
		vi.stubGlobal("fetch", fetchMock);

		const { result } = renderHook(() => useQrCode());
		let requestPromise!: Promise<Response>;

		act(() => {
			requestPromise = result.current.create({ data: testUrl });
		});

		expect(result.current.isLoading).toBe(true);

		await act(async () => {
			resolveResponse(new Response(JSON.stringify({ size: 21, matrix: "1".repeat(441) }), { status: 200 }));
			await requestPromise;
		});

		expect(result.current.isLoading).toBe(false);
		expect(result.current.QRCode).not.toBeNull();
	});

	it("QR code image is null when the input is invalid", async () => {
		const result = await createQrCode({ data: "" });

		expect(result.QRCode).toBeNull();
		expect(result.body).toBeNull();
		expect(result.error).not.toBeNull();
	});
});
