import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},

	test: {
		globals: true,
		environment: "jsdom",
		include: ["tests/vitest/**/*.test.{ts,tsx}"],

		setupFiles: ["./tests/vitest/setup.ts"],

		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
