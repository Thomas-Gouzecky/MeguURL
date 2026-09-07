import { beforeEach, describe, expect, it, vi } from "vitest";
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
	});
});
