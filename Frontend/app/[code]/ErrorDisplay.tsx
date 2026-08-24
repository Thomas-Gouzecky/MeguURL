import HomeButton from "../_components/HomeButton";

import DefaultGlass from "../_components/DefaultGlass";

export default function ErrorDisplay({ status, error }: { status: number; error: ServiceUnavailableResponse }) {
	return (
		<div className="min-h-fit grid grid-rows-5 p-4 gap-8">
			<div className="movable-background-image -top-30 left-1/2 -translate-x-1/2 absolute" />
			<div className="row-span-3" />
			<div className="row-span-2">
				<DefaultGlass>{errorMessage()}</DefaultGlass>
			</div>
		</div>
	);

	function errorMessage() {
		return (
			<div className="flex flex-col items-center justify-center gap-4 w-fit m-auto">
				<h1 className="text-6xl font-bold text-red-500">Error: {status}</h1>
				<p className=" text-xl">
					<span>{error.detail}</span>
				</p>

				<HomeButton />
			</div>
		);
	}
}
