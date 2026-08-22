"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-red-500">Error</h1>

			<p className="mt-4 text-xl">{error.message}</p>

			<Link
				href="/"
				className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				Go Home
			</Link>
		</main>
	);
}
