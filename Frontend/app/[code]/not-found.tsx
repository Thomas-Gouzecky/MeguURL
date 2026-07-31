export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-red-500">404</h1>

			<p className="mt-4 text-xl">This short URL doesn't exist.</p>

			<a
				href="/"
				className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				Go Home
			</a>
		</main>
	);
}
