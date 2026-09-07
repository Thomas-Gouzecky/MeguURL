import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},

	test: {
		globals: true,
		environment: "jsdom",
		include: ["tests/**/*.test.{ts,tsx}"],

		setupFiles: ["./tests/setup.ts"],

		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
