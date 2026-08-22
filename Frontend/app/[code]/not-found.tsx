import HomeButton from "../_components/HomeButton";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-red-500">404</h1>

			<p className="mt-4 text-xl">This short URL doesn't exist.</p>

			<HomeButton />
		</main>
	);
}
