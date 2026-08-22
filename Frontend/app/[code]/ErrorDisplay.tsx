import HomeButton from "../_components/HomeButton";

export default function ErrorDisplay({ status, error }: { status: number; error: ServiceUnavailableResponse }) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-6xl font-bold text-red-500">Error: {status}</h1>
			<p className="mt-4 text-xl">
				<span>{error.detail}</span>
			</p>

			<HomeButton />
		</main>
	);
}
